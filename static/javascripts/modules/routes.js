App.Router = Marionette.AppRouter.extend({
  routes: {
    '': 'index'
  },

  index: function(){
    var messagesView = new App.MessagesView({ collection: App.messages })
      , textareaView = new App.TextareaView();

    App.rootView.render();
    App.rootView.messagesRegion.show(messagesView);
    App.rootView.textareaRegion.show(textareaView);
  }
});
