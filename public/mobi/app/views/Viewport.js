GeoReview.views.Viewport = Ext.extend(Ext.TabPanel, {

  // we need at least one Panel with
  // fullscreen = true
  fullscreen: true,

  // default layout for TabPanel
  layout: 'card',

  // default animation for the card switch
  cardSwitchAnimation: 'slide',

  dockedItems: [
    // this is the toolbar at the top
    {
    xtype: 'toolbar',
    title: 'GeoReview',
    items: [] // end items
  }],

  // the tab bar at the bottom
  tabBar: { dock: 'bottom', layout: { pack: 'center' } },

  // if we wanted to listen for some events
  // we would put the methods here
  listeners: { }, 

  initComponent: function (){

    // create the main two panels
    var views = new Object();
    //views.map = new GeoReview.views.MapPanel();
    //views.about = new GeoReview.views.AboutPanel();

    // Adds to GeoReview.views the just created 
    // panels
    Ext.apply(GeoReview.views, views);

    var items = new Array();
    //items.push(GeoReview.views.map);
    //items.push(GeoReview.views.about);
    items.push(new Ext.Panel({ html: "Hello world with javascript!", layout: "fit" }));

    // Adds to the current panel's items 
    // the just created panels
    Ext.apply (this, {
      items: items
    });

    // call the superclass
    GeoReview.views.Viewport.superclass.initComponent.apply(this, arguments);
  } 
});
