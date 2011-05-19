
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
        { dock: 'bottom', width: '100%', cls: 'title', style: 'text-align: center !important;', html: '<img src="'+GeoReview.getUrlImage('loading')+'" />' },
    ],
    
    layout: {
        type: 'fit'
    },


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
                    if (!GeoReview.fromMarker){
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
        var that = GeoReview.views.map;
        
        for (i=0; i < that.markerLoaded.length; i++){
            that.markerLoaded[i].setMap(null);
            if (that.markerLoaded[i].label != null) that.markerLoaded[i].label.setMap(null);
        }
        
        that.markerLoaded = [];
        GeoReview.views.map.getDockedItems()[0].update('<img src="'+GeoReview.getUrlImage('loading')+'" />');
        GeoReview.models.loadReview( { 'lat': GeoReview.position.lat, 'lng': GeoReview.position.lng, 'radius': 10 } , GeoReview.views.map.showReviews);
    },

    records: null,
    markerLoaded: [], 

    showReviews: function(records){
    
        var that = GeoReview.views.map;
        that.records = records;
        
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
                records: records[i].items,
                icon: GeoReview.getUrlImage('marker')
            });


            google.maps.event.addListener(that.markerLoaded[i], 'mousedown', function() {
                GeoReview.fromMarker = true;

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
        
//        alert("i will do component layout");
/*        that.doComponentLayout();
        that.doLayout();*/
    },

    listeners: {
        activate: function() {
            Ext.getCmp("back").clearBackStack();
            
            if (GeoReview.position.lat == undefined) {
                GeoReview.callback = GeoReview.views.map.loadReviews;
                navigator.geolocation.getCurrentPosition(GeoReview.getPosition, null);
            }
            //else GeoReview.views.map.loadReviews();
            
            /*navigator.geolocation.getCurrentPosition(GeoReview.getPosition, null);*/
        }
    }
});
