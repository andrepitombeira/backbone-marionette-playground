define(["app", "tpl!apps/about/show/templates/message.tpl"], function(ContactManager, messageTpl) {
  ContactManager.module("AboutApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {
    Show.Message = Marionette.ItemView.extend({
      template: messageTpl
    });
  });

  return ContactManager.AboutApp.Show.View;
});
