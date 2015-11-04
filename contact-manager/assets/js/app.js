var ContactManager = new Marionette.Application();

ContactManager.navigate = function(route, options) {
  options || (options = {});
  Backbone.history.navigate(route, options);
};

ContactManager.on("before:start", function() {
  var RegionContainer = Marionette.LayoutView.extend({
    el: "#app-container",

    regions: {
      main: "#main-region",
      dialog: "#dialog-region"
    }
  });

  ContactManager.regions = new RegionContainer();

  ContactManager.regions.dialog.onShow = function(view) {
    var self = this;

    var closeDialog = function() {
      self.stopListening();
      self.empty();
      self.$el.dialog("destroy");
    }

    this.listenTo(view, "dialog:close", closeDialog);

    this.$el.dialog({
      modal: true,
      title: view.title,
      with: "auto",
      close: function(e, ui) {
        closeDialog();
      }
    });
  }
});

ContactManager.on("start", function() {
  if (Backbone.history) {
    Backbone.history.start();

    if (Backbone.history.fragment === "") {
      ContactManager.trigger("contacts:list");
    }
  }
});
