
GeoReview.views.MapPanel = Ext.extend(Ext.Panel, {

  // The title is shown only in the tab panel
  title: "Map",

  // The icon used by the tab panel
  // 'maps' is just a stock icon inside Sencha Touch
  iconCls: 'maps',

  // inline CSS
  style: 'text-align: center;',

  dockedItems: [
    { dock: 'bottom', html: "Click on the map to leave a review" },
  ],

  // the objects inside the Panel
  items: [
    { 
      // this is the actual Map Object
      xtype: 'map',
      useCurrentLocation: true,
      listeners: {
        afterrender: function() {
          google.maps.event.addListener(this.map, "click", function(e) {
            Ext.dispatch({ 
              controller: "MapController", 
              action: "insert", 
              latLng: e.latLng,
              historyUrl: "insert" 
            });
          })
        }
      }
    },
  ],

  listeners: {
    activate: function() {
      Ext.getCmp("back").clearBackStack();
    }
  }
});
