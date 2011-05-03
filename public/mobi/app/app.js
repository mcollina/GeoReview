
// This creates a GeoReview object in the global namespace
// that contains the entire application
Ext.regApplication({
  // this is defined by us in which we put global variables
  
  // the application name
  name: "GeoReview",
  tabletStartupScreen: "/mobi/resources/images/tablet_startup_screen.png",
  phoneStartupScreen: "/mobi/resources/images/phone_startup_screen.png",
  icon: "/mobi/resources/images/icon_app.png",

  // this function is called by Sencha Touch to startup the
  // application
  launch: function() {
    this.views.viewport = new this.views.Viewport();
  }
});


// Monkey patching sencha to make Maps touch event work
// see http://www.sencha.com/forum/showthread.php?129126-Google-Maps-Listener-on-click
Ext.gesture.Manager.onMouseEventOld = Ext.gesture.Manager.onMouseEvent;
Ext.gesture.Manager.onMouseEvent = function(e) {
	var target = e.target;

	while (target) {
		if (Ext.fly(target) && Ext.fly(target).hasCls('x-map')) {
			return;
		}

		target = target.parentNode;
	}

	this.onMouseEventOld.apply(this, arguments);
};

