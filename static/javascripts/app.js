//= require jquery-2.1.3
//= require jquery.timeago
//= require underscore
//= require backbone
//= require backbone.marionette
//= require materialize
//= require_tree ../templates
//= require_self
//= require_tree ./modules

var App = new Marionette.Application();

App.on('start', function(){
  App.state = new Marionette.Object();
  App.router = new App.Router();
  App.messages = new App.Messages();
  App.ws = new App.WebSocket({ collection: App.messages });
  App.addRegions({
    mainRegion: '#app',
    modalRegion: '#modal'
  });

  Backbone.history.start();
});

$(function(){
  App.start();
});
