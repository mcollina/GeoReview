
Ext.regController("MapController", {
  insert: function(options) {
    GeoReview.views.mapContainer.setActiveItem(GeoReview.views.insertReview);
    GeoReview.views.insertReview.updateWithPosition(options.latLng);
  }
});
