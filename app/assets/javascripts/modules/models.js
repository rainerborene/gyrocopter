App.Message = Backbone.Model.extend({

  initialize: function(){
    if (this.isNew()){
      this.set('id', this._uuid());
      this.set('published_at', (new Date()).toISOString());
    }
  },

  _uuid: function(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

});

App.Messages = Backbone.Collection.extend({
  model: App.Message
});

App.WebSocket = Marionette.Object.extend({

  initialize: function(){
    this._ws = new WebSocket('ws://' + location.host + '/');
    this._ws.onmessage = this._onMessage.bind(this);
    this.options.collection.on('add', this._onAdd, this);
  },

  _onAdd: function(model){
    this._ws.send(JSON.stringify(model.toJSON()));
  },

  _onMessage: function(message){
    var data = JSON.parse(message.data);
    this.options.collection.add(data);
  }

});
