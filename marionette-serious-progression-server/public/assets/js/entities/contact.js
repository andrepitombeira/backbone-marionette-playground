ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _){
  Entities.Contact = Entities.BaseModel.extend({
    urlRoot: "contacts",

    defaults: {
      firstName: "",
      lastName: "",
      phoneNumber: ""
    },

    url: function() {
      return this.urlRoot + "/" + this.get("id") + ".json";
    },

    parse: function(response) {
      var data = response;

      if (response) {
        if (response && response.contact) {
          data = response.contact;
        }
        data.fullName = data.firstName + " ";
        data.fullName += data.lastName;
        return data;
      } else {
        this.set({fullName: this.get("firstName") + " " + this.get("lastName")});
      }
    },

    validate: function(attrs, options) {
      var errors = {}

      if (! attrs.firstName) {
        errors.firstName = "can't be blank";
      }

      if (! attrs.lastName) {
        errors.lastName = "can't be blank";
      } else {
        if (attrs.lastName.length < 2) {
          errors.lastName = "is too short";
        }
      }

      if( ! _.isEmpty(errors)){
        return errors;
      }
    },

    sync: function(method, model, options) {
      console.log("Contacts sync function called.");

      return Entities.BaseModel.prototype.sync.call(this, method, model, options);
    }
  });

  Entities.ContactCollection = Backbone.Collection.extend({
    url: "contacts",
    model: Entities.Contact,
    comparator: "firstName"
  });

  var API = {
    getContactEntities: function(options) {
      var contacts = new Entities.ContactCollection();
      var defer = $.Deferred();
      options || (options = {});
      defer.then(options.success, options.error);
      var response = contacts.fetch(_.omit(options, 'success', 'error'));

      response.done(function() {
        defer.resolveWith(response, [contacts]);
      });

      response.fail(function() {
        defer.rejectWith(response, arguments);
      });

      return defer.promise();
    },

    getContactEntity: function(contactId, options){
      var contact = new Entities.Contact({id: contactId});
      var defer = $.Deferred();
      options || (options = {});
      defer.then(options.success, options.error);

      var response = contact.fetch(_.omit(options, 'success', 'error'));

      response.done(function() {
          defer.resolveWith(response, [contact]);
      });

      response.fail(function() {
        defer.rejectWith(response, arguments);
      });

      return defer.promise();
    }
  };

  ContactManager.reqres.setHandler("contact:entities", function(options){
    return API.getContactEntities(options);
  });

  ContactManager.reqres.setHandler("contact:entity", function(id, options){
    return API.getContactEntity(id, options);
  });
});
