App.Router = Marionette.AppRouter.extend({

  routes: {
    'login(/)': 'login',
    '': 'index'
  },

  unauthorized: function(){
    return App.state.getOption('name') === undefined;
  },

  redirectTo: function(route){
    this.navigate(route, { trigger: true, replace: true });
  },

  login: function(){
    var modalView = new App.ModalView();
    App.modalRegion.show(modalView);
  },

  index: function(){
    if (this.unauthorized()){
      return this.redirectTo('login');
    }

    var messagesView = new App.MessagesView({ collection: App.messages });

    App.WebSocket.start();
    App.mainRegion.show(messagesView);
  }

});
