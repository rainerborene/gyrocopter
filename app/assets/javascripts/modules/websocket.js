App.module('WebSocket', function(){

  var ws;

  var trigger = function(eventName){
    return function(event){
      App.vent.trigger(eventName, event);
    };
  };

  var onMessage = function(message){
    var data = JSON.parse(message.data);
    App.vent.trigger("socket:message", data);
  };

  var send = function(data){
    ws.send(JSON.stringify(data));
  };

  this.connect = function(){
    ws = new WebSocket('ws://' + location.host + '/');
    ws.onerror = trigger("socker:error");
    ws.onopen = trigger("socker:open");
    ws.onclose = trigger("socket:close");
    ws.onmessage = onMessage;
  };

  App.vent.on("socket:send", send);

});
