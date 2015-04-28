App.Message = Backbone.Model.extend();

App.Messages = Backbone.Collection.extend({
  model: App.Message
});

App.WebSocket = Marionette.Object.extend({

  initialize: function(){
    this._ws = new WebSocket('ws://' + location.host + '/');
    this._ws.onmessage = this._onMessage.bind(this);
    this._ws.onerror = this._onError.bind(this);
  },

  _onError: function(){
    console.log(arguments);
  },

  _onAdd: function(model){
    this.send(model.toJSON());
  },

  _onMessage: function(message){
    var data = JSON.parse(message.data);
    this.options.collection.add(data);
  },

  send: function(data){
    this._ws.send(JSON.stringify(data));
  }

});
