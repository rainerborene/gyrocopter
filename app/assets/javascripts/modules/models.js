App.Message = Backbone.Model.extend({

  defaults: function(){
    return {
      id: App.uuid4.generate(),
      published_at: (new Date()).toISOString()
    };
  }

});

App.Messages = Backbone.Collection.extend({

  model: App.Message,

  initialize: function(){
    var messages = store.get("messages");

    App.vent.on("socket:message", this._onMessage, this);
    App.vent.on("socket:opened", this._onOpened, this);
    App.vent.on("socket:closed", this._onClosed, this);

    if (messages){
      this.add(messages, { merge: true });
    }
  },

  _synchronize: function(){
    var messages = this.filter(function(model){
          return model.get("pending");
        }).map(function(model){
          return model.toJSON();
        });

    store.set("messages", messages);
  },

  _onOpened: function(){
    var messages = store.get("messages");

    if (this.interval){
      clearInterval(this.interval);
    }

    if (messages){
      messages.forEach(function(model){
        App.vent.trigger("socket:send", model);
      });
    }
  },

  _onClosed: function(){
    this.interval = setInterval(this._synchronize.bind(this), 2000);
  },

  _onMessage: function(model){
    model.pending = false;
    this.add(model, { merge: true });
    this._synchronize();
  }

});
