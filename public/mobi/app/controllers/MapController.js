Ext.regController("MapController", {
    insert: function(options) {
		if(navigator.onLine){
        	GeoReview.views.mapContainer.setActiveItem(GeoReview.views.insertReview);
        	GeoReview.views.insertReview.updateWithPosition(options.latLng);
		}else{
			GeoReview.views.mapContainer.setActiveItem(GeoReview.views.offlinePanel);
		}
    },

    showMap: function() {
		if(navigator.onLine){
        	GeoReview.views.mapContainer.setActiveItem(GeoReview.views.map);
        	GeoReview.views.map.loadReviews();
		} else{
			GeoReview.views.mapContainer.setActiveItem(GeoReview.views.offlinePanel);
		}
    },

    showList: function(options){
		if(navigator.onLine){
        	GeoReview.views.mapContainer.setActiveItem(GeoReview.views.listReview);
        	GeoReview.views.listReview.updateWithPosition(options.latLng);
       	 	GeoReview.models.listReview.load(options.records);
		 }else{
		 	GeoReview.views.mapContainer.setActiveItem(GeoReview.views.offlinePanel);
		 }
				  
    }
});
