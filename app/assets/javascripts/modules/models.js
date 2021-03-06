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
    App.vent.on("socket:message", this._onMessage, this);
  },

  _onMessage: function(model){
    this.add(model, { merge: true });
  }

});
