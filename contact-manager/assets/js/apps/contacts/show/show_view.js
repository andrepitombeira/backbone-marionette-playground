define(["app",
        "tpl!apps/contacts/show/templates/missing.tpl",
        "tpl!apps/contacts/show/templates/view.tpl"], function(ContactManager, missingTpl, viewTpl) {
  ContactManager.module("ContactsApp.Show.View", function(Show, ContactManager, Backbone, Marionette, $, _) {
  	Show.Contact = Marionette.ItemView.extend({
  		template: viewTpl,

  		events: {
  			"click a.js-edit": "editClicked"
  		},

  		editClicked: function(e) {
  			e.preventDefault();
  			this.trigger("contact:edit", this.model);
  		}
  	});

  	Show.MissingContact = Marionette.ItemView.extend({
  		template: missingTpl
  	});
  });

  return ContactManager.ContactsApp.Show.View;
});
