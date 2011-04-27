
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
