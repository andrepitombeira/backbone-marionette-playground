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
      var url = '/api/logout';

      var formValues = {
        username: username
      };

      $.ajax({
        url: url,
        type:'POST',
        dataType:"json",
        data: formValues,
        success: function(ok) {
          console.log('LOGOUT success');
        }
      });
    },

    showLogin: function(options) {
      var view = new Login.Show();

      if (options && options.isLogout) {
        //logout
      }

      this.listenTo(view, 'authenticate', function(data) {
        this.authenticate(data.username, data.password, data.authorized, data.unauthorized);
      });

      ContactManager.regions.main.show(view);
    }
  });

  Login.Controller = new Controller();
});
