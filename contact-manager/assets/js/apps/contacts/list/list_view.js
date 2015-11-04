ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
	List.Layout = Marionette.LayoutView.extend({
		template: "#contact-list-layout",

		regions: {
			panelRegion: "#panel-region",
			contactsRegion: "#contacts-region"
		}
	});

	List.Panel = Marionette.ItemView.extend({
		template: "#contact-list-panel",

    triggers: {
      "click button.js-new": "contact:new"
    },

    events: {
      "submit #filter-form": "filterContacts"
    },

    filterContacts: function(e) {
      e.preventDefault();
      var criterion = this.$(".js-filter-criterion").val();
      this.trigger("contacts:filter", criterion);
    }
	});

	List.Contact = Marionette.ItemView.extend({
			tagName: "tr",
			template: "#contact-list-item",

      triggers: {
        "click td a.js-show": "contact:show",
				"click td a.js-edit": "contact:edit",
				"click button,js-delete": "contact:delete"
      },

			events: {
				"click": "highlightName"
			},

			flash: function(cssClass) {
				var $view = this.$el;
				$view.hide().toggleClass(cssClass).fadeIn(800, function() {
					setTimeout(function() {
						$view.toggleClass(cssClass);
					}, 500)
				});
			},

			highlightName: function(e) {
				e.preventDefault();
				this.$el.toggleClass("warning");
			},

			remove: function() {
				var self = this;
				this.$el.fadeOut(function() {
					Marionette.ItemView.prototype.remove.call(self);
				});
			}
	});

	List.Contacts = Marionette.CompositeView.extend({
		tagName: "table",
		className: "table table-hover",
		template: "#contact-list",
		childView: List.Contact,
		childViewContaier: "tbody",

    initialize: function() {
      this.listenTo(this.collection, "reset", function() {
        this.attachHtml = function(collectionView, childView, index) {
          collectionView.$el.prepend(childView.el);
        }
      });
    },

    onRenderCollection: function() {
      this.attachHtml = function(collectionView, childView, index) {
        collectionView.$el.prepend(childView.el);
      }
    }
	});
});
