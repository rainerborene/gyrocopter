//= require jquery-2.1.3
//= require underscore
//= require backbone
//= require backbone.marionette
//= require materialize
//= require_tree ../templates
//= require_self
//= require_tree ./modules

var App = new Marionette.Application();

App.on('start', function(){
  App.messages = new App.Messages();
  App.rootView = new App.LayoutView();
  App.router = new App.Router();
  Backbone.history.start();
});

$(function(){
  App.start();
});
