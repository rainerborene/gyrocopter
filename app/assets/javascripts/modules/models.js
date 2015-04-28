App.Message = Backbone.Model.extend({

  defaults: function(){
    return {
      id: App.uuid4.generate(),
      published_at: (new Date()).toISOString(),
      pending: true
    };
  }

});

App.Messages = Backbone.Collection.extend({

  model: App.Message,

  initialize: function(){
    App.vent.on("socket:message", this._onMessage, this);
  },

  _onMessage: function(model){
    model.pending = false;
    this.add(model, { merge: true });
  }

});
