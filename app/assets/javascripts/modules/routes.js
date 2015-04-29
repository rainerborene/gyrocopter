App.Router = Marionette.AppRouter.extend({

  controller: App.Controller,

  appRoutes: {
    'login(/)': 'login',
    '': 'index'
  },

  unauthorized: function(){
    return App.state.getOption('name') === undefined;
  },

  redirectTo: function(route){
    this.navigate(route, { trigger: true, replace: true });
  }

});
