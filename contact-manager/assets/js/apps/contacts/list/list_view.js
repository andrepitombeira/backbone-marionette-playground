ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {
	List.Layout = Marionette.LayoutView.extend({
		template: "#contact-list-layout",

		regions: {
			panelRegion: "#panel-region",
			contactsRegion: "#contacts-region"
		}
	});

	List.Panel = Marionette.ItemView.extend({
		template: "#contact-list-panel"
	});

	List.Contact = Marionette.ItemView.extend({
			tagName: "tr",
			template: "#contact-list-item",

			events: {
				"click": "highlightName",
				"click td a.js-show": "showClicked",
				"click td a.js-edit": "editClicked",
				"click button,js-delete": "deleteClicked"
			},

			flash: function(cssClass) {
				var $view = this.$el;
				$view.hide().toggleClass(cssClass).fadeIn(800, function() {
					setTimeout(function() {
						$view.toggleClass(cssClass);
					}, 500)
				});
			},

			showClicked: function(e) {
				e.preventDefault();
				e.stopPropagation();
				this.trigger("contact:show", this.model);
			},

			editClicked: function(e) {
				e.preventDefault();
				e.stopPropagation();
				this.trigger("contact:edit", this.model);
			},

			highlightName: function(e) {
				e.preventDefault();
				this.$el.toggleClass("warning");
			},

			deleteClicked: function(e) {
				e.stopPropagation();
				this.trigger("contact:delete", this.model);
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
		childViewContaier: "tbody"
	});
});
