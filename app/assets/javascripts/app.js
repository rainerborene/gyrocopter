//= require jquery-2.1.3
//= require underscore
//= require backbone
//= require backbone.marionette
//= require materialize
//= require uuid4
//= require sugar
//= require store
//= require_tree ../templates
//= require_self
//= require_tree ./modules

var App = new Marionette.Application();

App.on('start', function(){
  App.messages = new App.Messages();
  App.state = new Marionette.Object();
  App.router = new App.Router();
  App.addRegions({
    mainRegion: '#app',
    modalRegion: '#modal'
  });

  Backbone.history.start();
});
