
GeoReview.views.MapPanel = Ext.extend(Ext.Panel, {

  // The title is shown only in the tab panel
  title: "Map",

  // The icon used by the tab panel
  // 'maps' is just a stock icon inside Sencha Touch
  iconCls: 'maps',

  // inline CSS
  style: 'text-align: center;',

  dockedItems: [
   // { dock: 'bottom', html: "Click on the map to leave a review" },
   { dock: 'bottom', html: '<img src="/mobi/resources/images/loading.gif">' },
  ],

  // the objects inside the Panel
  items: [
    { 
      // this is the actual Map Object
      xtype: 'map',
      mapOptions: {
        zoom: 16
      },
      useCurrentLocation: true,
      listeners: {
        afterrender: function() {
          google.maps.event.addListener(this.map, "click", function(e) {
            if (!document.fromMarker){
                Ext.dispatch({ 
                  controller: "MapController", 
                  action: "insert", 
                  latLng: e.latLng
                });
            }
          })
        }
      }
    },
  ],

  loadReviews: function(){
    GeoReview.views.map.getDockedItems()[0].update('<img src="/mobi/resources/images/loading.gif">');
    GeoReview.models.loadReview( { 'lat': GeoReview.position.lat, 'lng': GeoReview.position.lng, 'radius': 10 } , this.showReviews);
  },
  
  records: null,
  markerLoaded: [], 
  
  showReviews: function(records){
    var that = GeoReview.views.map;
    that.records = records;
    
    for (i=0; i < that.markerLoaded.length; i++){
        that.markerLoaded[i].setMap(null);
        if (that.markerLoaded[i].label != null) that.markerLoaded[i].label.setMap(null);
    }
    
    for (i=0; i < records.length; i++){
    
        if (records[i].items.length > 1){
            var label = new Label({
                map: that.items.getAt(0).map
            });
            label.set('text', records[i].items.length);
        }
        
        that.markerLoaded[i] = new google.maps.Marker({
	        map: that.items.getAt(0).map, 
		    position: new google.maps.LatLng(records[i].lat, records[i].lng),
		    records: records[i].items
        });
        
        
        google.maps.event.addListener(that.markerLoaded[i], 'mousedown', function() {
            document.fromMarker = true;
            
            Ext.dispatch({ 
              controller: "MapController", 
              action: "showList", 
              latLng: this.position,
              records: this.records
            });
        });
        
        if (records[i].items.length > 1) {
            label.bindTo('position', that.markerLoaded[i], 'position');
            that.markerLoaded[i].label = label;
        }
        
    } 
    that.getDockedItems()[0].update("Click on the map to leave a review");
  },

  listeners: {
    activate: function() {
      if (!(Ext.History.getToken()=='about')){
          Ext.getCmp("back").clearBackStack();
          GeoReview.callback = GeoReview.views.map.loadReviews;
          if (GeoReview.position.lat == undefined) navigator.geolocation.getCurrentPosition(GeoReview.getPosition, null);
          else GeoReview.views.map.loadReviews();
      }
    }
  }
});
