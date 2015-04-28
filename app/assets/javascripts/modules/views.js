App.ModalView = Marionette.ItemView.extend({
  template: JST.modal,
  className: 'modal',

  ui: {
    input: 'input',
    actionButton: '.modal-action'
  },

  events: {
    'keypress @ui.input': 'onInputKeyPress',
    'click @ui.actionButton': 'onActionClick'
  },

  onRender: function(){
    this.$el.openModal({ dismissible: false });
  },

  onInputKeyPress: function(ev){
    if (ev.keyCode === 13){
      this.ui.actionButton.trigger('click');
    }
  },

  onActionClick: function(ev){
    var name = $.trim(this.ui.input.val());
    if (name.length){
      this.$el.closeModal();
      App.state.mergeOptions({ name: name }, ['name']);
      App.router.redirectTo('');
    }

    ev.preventDefault();
  }
});

App.MessageView = Marionette.ItemView.extend({
  className: 'message',
  template: JST.message,

  ui: {
    time: '.message-time'
  },

  onRender: function(){
    this.ui.time.timeago();
  }
});

App.MessagesView = Marionette.CompositeView.extend({
  childView: App.MessageView,
  childViewContainer: '.messages',
  template: JST.chat,
  className: 'messenger',

  ui: {
    input: 'input'
  },

  events: {
    'keypress @ui.input': 'onInputKeyPress'
  },

  onInputKeyPress: function(ev){
    var value = $.trim(this.ui.input.val());

    if (ev.keyCode === 13 && value.length){
      App.ws.send({
        author: App.state.getOption('name'),
        body: value,
        published_at: (new Date()).toISOString()
      });

      this.ui.input.val('');
    }
  }
});
