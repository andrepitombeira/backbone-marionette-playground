ContactManager.module("AuthApp.Login", function(Login, ContactManager, Backbone, Marionette, $, _) {
  var Controller = Marionette.Controller.extend({
    authenticate: function(username, password, authorized, unauthorized) {
      var url = '/sign_in';

      var formValues = {
        login: username,
        password: password
      };

      $.ajax({
        url:url,
        type:'POST',
        dataType:"json",
        data: formValues,
        success: function(data) {
          window.localStorage.setItem("token", data.entity.token);
          ContactManager.trigger("contacts:list");
        },
        error: function() {
          console.log("Error!");
        }
      });
    },

    logout: function() {
      var url = '/sign_out';

      $.ajax({
        url: url,
        type:'DELETE',
        dataType:"json",
        success: function(ok) {
          window.localStorage.removeItem('token');
          ContactManager.trigger("auth:login");
          ContactManager.navigate("login");
        }
      });
    },

    showLogin: function(options) {
      var view = new Login.Show();

      if (options && options.isLogout) {
        this.logout();
      }

      this.listenTo(view, 'authenticate', function(data) {
        this.authenticate(data.username, data.password, data.authorized, data.unauthorized);
      });

      ContactManager.regions.main.show(view);
    }
  });

  Login.Controller = new Controller();
});
