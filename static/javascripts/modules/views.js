App.LayoutView = Marionette.LayoutView.extend({
  el: '#app',
  template: JST.layout,
  regions: {
    messagesRegion: '.messages',
    textareaRegion: '.textarea'
  }
});

App.TextareaView = Marionette.ItemView.extend({
  template: JST.textarea,
  className: 'row',

  ui: {
    input: 'input'
  },

  events: {
    'keypress @ui.input': 'onKeyPress'
  },

  onKeyPress: function(ev){
    var value = $.trim(this.ui.input.val());

    if (ev.keyCode === 13 && value.length){
      App.messages.add({ author: 'Rainer Borene', message: value });
      this.ui.input.val('');
    }
  }
});

App.MessageView = Marionette.ItemView.extend({
  className: 'message',
  template: JST.message
});

App.MessagesView = Marionette.CollectionView.extend({
  childView: App.MessageView
});
