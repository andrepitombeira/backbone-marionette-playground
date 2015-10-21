ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {
	ContactsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "contacts": "listContacts"
		}
	});

	var API = {
		listContacts: function() {
			ContactsApp.List.Controller.listContacts();
		}
	};

	ContactsApp.on('start', function() {
		new ContactsApp.Router({
			controller: API
		});
	})
});
