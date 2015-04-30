App.Controller = {

  _onMessagesInputEnter: function(value){
    var model = this.collection.add({
      author: App.state.getOption("name"),
      body: value,
      pending: true
    });

    App.vent.trigger("socket:send", model.toJSON());
  },

  _onModalJoin: function(name){
    App.state.mergeOptions({ name: name }, ["name"]);
    App.router.redirectTo("");
  },

  login: function(){
    var modalView = new App.ModalView();
    modalView.on("join", this._onModalJoin);
    App.modalRegion.show(modalView);
  },

  index: function(){
    if (App.router.unauthorized()){
      return App.router.redirectTo("login");
    }

    var messagesView = new App.MessagesView({ collection: App.messages });
    messagesView.on("input:enter", this._onMessagesInputEnter);

    App.WebSocket.start();
    App.mainRegion.show(messagesView);
  }

};
