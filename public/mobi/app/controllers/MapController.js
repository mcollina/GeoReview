Ext.regController("MapController", {
  insert: function(options) {
    GeoReview.views.mapContainer.setActiveItem(GeoReview.views.insertReview);
    GeoReview.views.insertReview.updateWithPosition(options.latLng);
  },

  showMap: function() {
    GeoReview.views.mapContainer.setActiveItem(GeoReview.views.map);
  },
  
  showList: function(options){
    GeoReview.views.mapContainer.setActiveItem(GeoReview.views.listReview);
    GeoReview.views.listReview.updateWithPosition(options.latLng);
    GeoReview.models.listReview.load(options.records);
  }
});
