define(["app", "apps/config/storage/localstorage"], function(ContactManager) {
  ContactManager.module('Entities', function(Entities, ContactManager, Backbone, Marionette, $, _) {
    Entities.Contact = Backbone.Model.extend({
      urlRoot: "contacts",

      defaults: {
        firstName: "",
        lastName: "",
        phoneNumber: ""
      },

      validate: function(attrs, options) {
        var errors = {};

        if (!attrs.firstName) {
          errors.firstName = "can't be blank";
        }

        if (!attrs.lastName) {
          errors.lastName = "can't be blank";
        } else if (attrs.lastName.length < 2) {
          errors.lastName = "is too short";
        }

        if (!_.isEmpty(errors)) {
          return errors;
        }
      }
    });

    Entities.configureStorage("ContactManager.Entities.Contact", Entities.Contact);

    Entities.ContactCollection = Backbone.Collection.extend({
      url: "contacts",
      model: Entities.Contact,
      comparator: "firstName"
    });

    Entities.configureStorage("ContactManager.Entities.ContactCollection", Entities.ContactCollection);

    var initializaContacts =  function() {
      var contacts = new Entities.ContactCollection([
        { id: 1, firstName: "Alice", lastName: "Arten", phoneNumber: "555-0184" },
        { id: 2, firstName: "Bob", lastName: "Brigham", phoneNumber: "555-0163" },
        { id: 3, firstName: "Charlie", lastName: "Campbell", phoneNumber: "555-0129" }
      ]);

      contacts.forEach(function(contact) {
        contact.save();
      });

      return contacts.models;
    };

    var API = {
      getContactsEntities: function() {
        var contacts = new Entities.ContactCollection();
        var defer = $.Deferred();

        contacts.fetch({
          success: function(data) {
            defer.resolve(data);
          }
        });

        var promise = defer.promise();

        $.when(promise).done(function(fetchedContacts) {
          if (fetchedContacts.length === 0) {
            var models = initializaContacts();
            contacts.reset(models);
          }
        });

        return promise;
      },
      getContactEntity: function(contactId) {
        var contact = new Entities.Contact({id: contactId});
        var defer = $.Deferred();

        setTimeout(function() {
          contact.fetch({
            success: function(data) {
              defer.resolve(data);
            },
            error: function(data) {
              defer.resolver(undefined);
            }
          });
        }, 2000);

        return defer.promise();
      }
    }

    ContactManager.reqres.setHandler("contact:entities", function() {
      return API.getContactsEntities();
    });

    ContactManager.reqres.setHandler("contact:entity", function(id) {
      return API.getContactEntity(id);
    });

    ContactManager.reqres.setHandler("contact:entity:new", function(id) {
      return new Entities.Contact();
    });
  });

  return;
});
