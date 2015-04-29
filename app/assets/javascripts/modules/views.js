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
      this.trigger('join', name);
    }

    ev.preventDefault();
  }
});

App.MessageView = Marionette.ItemView.extend({
  className: 'message',
  template: JST.message,
  templateHelpers: {
    format: function(date){
      return Date.create(date).format("{MM}/{dd}/{yyyy} {HH}:{mm}");
    }
  },

  modelEvents: {
    "change": "render"
  },

  ui: {
    time: '.message-time'
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

    if (value.length && ev.keyCode === 13){
      this.trigger('input:enter', value);
      this.ui.input.val('');
    }
  }
});
