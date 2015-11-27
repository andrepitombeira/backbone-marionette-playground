ContactManager.module("AuthApp.Login", function(Login, ContactManager, Backbone, Marionette, $, _) {
  Login.Show = Marionette.ItemView.extend({
    template: "#login",

    events: {
      "click #loginButton": "login"
    },

    ui: {
      inputEmail: "input#username",
      inputPassword: "input#password",
      loginButton: "button#loginButton"
    },

    login:  function(event) {
      event.preventDefault();

      this.onBeforeLogin();
      username = this.ui.inputEmail.val();
      password = this.ui.inputPassword.val();
      authorized = this.onAuthorized;
      unauthorized = this.onUnauthorized;
      this.trigger('authenticate', { username, password, authorized, unauthorized });
    },

    onBeforeLogin: function() {
      $('.alert-error').hide();
    },

    onAuthorized: function() {
      window.location.replace('#');
    },

    onUnauthorized: function() {
      $('.alert-error').text("Username or password not valid.").show();
    }
  });
});
