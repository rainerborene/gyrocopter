App.module('WebSocket', function(){

  var trigger = function(eventName){
    return function(event){
      App.vent.trigger(eventName, event);
    };
  };

  this.startWithParent = false;

  this._onMessage = function(message){
    var data = JSON.parse(message.data);
    App.vent.trigger("socket:message", data);
  };

  this._send = function(data){
    this._ws.send(JSON.stringify(data));
  };

  this.onStart = function(){
    this._ws = new WebSocket('ws://' + location.host + '/');
    this._ws.onerror = trigger("socket:error");
    this._ws.onopen = trigger("socket:opened");
    this._ws.onclose = trigger("socket:closed");
    this._ws.onmessage = this._onMessage;
  };

  App.vent.on("socket:send", this._send, this);

});
