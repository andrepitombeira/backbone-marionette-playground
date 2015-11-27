ContactManager.module("AuthApp.Login", function(Login, ContactManager, Backbone, Marionette, $, _) {
  var Controller = Marionette.Controller.extend({
    authenticate: function(username, password, authorized, unauthorized) {
      var url = '/api/login';

      console.log('Loggin in... ');

      var formValues = {
        username: username,
        password: password
      };

      $.ajax({
        url:url,
        type:'POST',
        dataType:"json",
        data: formValues,
        success: function(ok) {
          if (ok) {
            authorized();
          } else {
            unauthorized();
          }
        }
      });
    },

    showLogin: function() {
      var view = new Login.Show();

      this.listenTo(view, 'authenticate', function(data) {
        this.authenticate(data.username, data.password, data.authorized, data.unauthorized);
      });

      ContactManager.regions.main.show(view);
    }
  });

  Login.Controller = new Controller();
});
