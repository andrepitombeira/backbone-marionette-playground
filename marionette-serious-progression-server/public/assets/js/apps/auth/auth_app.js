ContactManager.module("AuthApp", function(AuthApp, ContactManager, Backbone, Marionette, $, _) {
  AuthApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "login": "login",
      "logout": "logout"
    }
  });

  var API = {
    login: function() {
      AuthApp.Login.Controller.showLogin();
    },

    logout: function() {
      AuthApp.Login.Controller.showLogout();
    }
  };

  ContactManager.on("auth:login", function() {
    API.login();
  });

  ContactManager.on("auth:logout", function() {

  });

  AuthApp.on("start", function() {
    new AuthApp.Router({
      controller: API
    })
  });
});
