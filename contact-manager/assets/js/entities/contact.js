ContactManager.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
  Entities.Contact = Backbone.Model.extend({
    urlRoot: "contacts"
  });

  Entities.configureStorage("ContactManager.Entities.Contact");

  Entities.ContactCollection = Backbone.Collection.extend({
    url: "contacts",
    model: Entities.Contact,
    comparator: "firstName"
  });

  Entities.configureStorage("ContactManager.Entities.ContactCollection");

  var initializaContacts =  function() {
    var contacts = new Entities.ContactCollection([
      { id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0184" },
      { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0163" },
      { id: 3, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0129" }
    ]);

    contacts.forEach(function(contact) {
      contact.save();
    });

    return contacts;
  };

  var API = {
    getContactsEntities: function() {
      var contacts = new Entities.ContactCollection();
      contacts.fetch();
      if (contacts.length === 0) {
        return initializaContacts();
      }
      return contacts;
    },
    getContactEntity: function(contactId) {
      var contact = new Entities.Contact({id: contactId});
      contact.fetch();
      return contact;
    }
  }

  ContactManager.reqres.setHandler("contact:entities", function() {
    return API.getContactsEntities();
  });

  ContactManager.reqres.setHandler("contact:entity", function(id) {
    return API.getContactEntity(id);
  });
});
