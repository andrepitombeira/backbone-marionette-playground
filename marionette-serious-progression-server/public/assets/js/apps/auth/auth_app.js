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
      var options= {isLogout: true};
      AuthApp.Login.Controller.showLogin(options);
    }
  };

  ContactManager.on("auth:login", function() {
    API.login();
  });

  ContactManager.on("auth:logout", function() {
    API.logout();
  });

  AuthApp.on("start", function() {
    new AuthApp.Router({
      controller: API
    })
  });
});
