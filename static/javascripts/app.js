//= require jquery-2.1.3
//= require underscore
//= require backbone
//= require backbone.marionette
//= require materialize
//= require_tree ../templates
//= require_self

var App = new Marionette.Application();

App.LayoutView = Marionette.LayoutView.extend({
  el: '#app',
  template: JST.layout,
  regions: {
    messages: '.messages',
    textarea: '.textarea'
  }
});

App.TextareaView = Marionette.ItemView.extend({
  template: JST.textarea,

  events: {
    'keyup input': 'log'
  },

  log: function(){
    console.log('it works');
  }
});

App.Router = Marionette.AppRouter.extend({
  routes: {
    '': 'index'
  },

  index: function(){
    var messages = new App.Messages()
      , messagesView = new App.MessagesView({ collection: messages })
      , textareaView = new App.TextareaView();

    App.rootView.render();
    App.rootView.getRegion('messages').show(messagesView);
    App.rootView.getRegion('textarea').show(textareaView);

    messages.add(
      new App.Message({ author: 'Rainer Borene', message: 'it works', time: 'now' })
    );
  }
});

App.Message = Backbone.Model.extend();
App.Messages = Backbone.Collection.extend({ model: App.Message });

App.MessageView = Marionette.ItemView.extend({ template: JST.message });
App.MessagesView = Marionette.CollectionView.extend({ childView: App.MessageView });

App.on('start', function(){
  App.rootView = new App.LayoutView();
  App.router = new App.Router();
  Backbone.history.start();
});

$(function(){
  App.start();
});
