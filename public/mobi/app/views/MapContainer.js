
GeoReview.views.MapContainerPanel = Ext.extend(Ext.Panel, {

  // The title is shown only in the tab panel
  title: "Map",

  // The icon used by the tab panel
  // 'maps' is just a stock icon inside Sencha Touch
  iconCls: 'maps',

  // layout
  layout: 'card',

  // default animation for the card switch
  cardSwitchAnimation: 'slide',
  
  listeners: {
    activate: function(){

        if (this.getActiveItem() == GeoReview.views.insertReview) Ext.getCmp('back').addToBackStack({ controller: 'MapController', action: 'showMap' });
        if (this.getActiveItem() == GeoReview.views.listReview) Ext.getCmp('back').addToBackStack({ controller: 'MapController', action: 'showMap'}); 
    }
  },

  initComponent: function() {

    // create the main two panels
    var views = new Object();
    views.map = new GeoReview.views.MapPanel();
    views.insertReview = new GeoReview.views.InsertReviewPanel();
    views.listReview = new GeoReview.views.ListReview();

    Ext.apply(GeoReview.views, views);

    var items = new Array();
    items.push(GeoReview.views.map);
    items.push(GeoReview.views.insertReview);
    items.push(GeoReview.views.listReview);

    // Adds to the current panel's items 
    // the just created panels
    Ext.apply (this, {
      items: items
    });

    // call the superclass
    GeoReview.views.MapContainerPanel.superclass.initComponent.apply(this, arguments);
  }
});
