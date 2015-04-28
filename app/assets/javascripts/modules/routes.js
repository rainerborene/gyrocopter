App.Router = Marionette.AppRouter.extend({

  routes: {
    'login(/)': 'login',
    '': 'index'
  },

  authorize: function(){
    return App.state.getOption('name') !== undefined;
  },

  redirectTo: function(route){
    this.navigate(route, { trigger: true, replace: true });
  },

  login: function(){
    var modalView = new App.ModalView();
    App.modalRegion.show(modalView);
  },

  index: function(){
    if (this.authorize()){
      var messagesView = new App.MessagesView({ collection: App.messages });
      App.WebSocket.connect();
      App.mainRegion.show(messagesView);
    } else {
      this.redirectTo('login');
    }
  }

});
