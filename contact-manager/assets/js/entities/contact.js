ContactManager.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
  Entities.Contact = Backbone.Model.extend({});

  Entities.ContactCollection = Backbone.Collection.extend({
    model: ContactManager.Contact,
    comparator: "firstName"
  });

  var contacts;

  var initializaContacts =  function() {
    contacts = [
      {
        firstName: "Bob",
        lastName: "Brigam",
        phoneNumber: "555-0163"
      },
      {
        firstName: "Alice",
        lastName: "Arten",
        phoneNumber: "555-0184"
      },
      {
        firstName: "Charlie",
        lastName: "Campbel",
        phoneNumber: "555-0129"
      }
    ]
  };

  var API = {
    getContactsEntities: function() {
      if (contacts === undefined) {
        initializaContacts();
      }
      return contacts;
    }
  }

  ContactManager.reqres.setHandler("contact:entities", function() {
    return API.getContactsEntities();
  });
});
