GeoReview.views.ListReview = Ext.extend(Ext.Panel, {

    // inline CSS
    style: 'text-align: center;',

    dockedItems: [
        // { dock: 'bottom', html: "Click on the map to leave a review" },
        { dock: 'bottom', style: 'margin: 0px auto;', width: '100%', height: 30, items: [
            {
        xtype: 'button',
        ui: 'action',
        height: 20,
        width: 200,
        text: 'Leave a comment',
        handler: function(){
            Ext.getCmp('back').addToBackStack({ controller: 'MapController', action: 'showList', latLng: GeoReview.views.listReview.latLng, records: GeoReview.models.listReview.records});
            Ext.dispatch({ 
                controller: "MapController", 
                action: "insert", 
                latLng: GeoReview.views.listReview.latLng
            });
        }
    }
    ] },

    {
        id: 'positionList', dock: 'top', cls: 'title', height: 50 , width: '100%'
    }
    ],

    layout: {
        type: 'fit',
        align: 'stretch'
    },

    latLng: null,
    updateWithPosition: function(latLng) {
        this.getDockedComponent('positionList').update('Position: <img src="'+GeoReview.getUrlImage('loading')+'" />');
        this.latLng = latLng;
        var that = this;
        (new google.maps.Geocoder()).geocode({ location: latLng }, function(results) { 
            that.getComponent('positionList').update('Position: ' + results[0].formatted_address);
        });

        setTimeout("GeoReview.views.listReview.releaseFromMarker()",1500);
    },

    releaseFromMarker: function(){
        GeoReview.fromMarker = false;
    },

    items: [

        {
        xtype: 'list',
        store: GeoReview.models.listReview,
        singleSelect: false,
        disableSelection: true,
        itemTpl: '<div style="text-align: left; padding-left: 5px">{name} <br/> <tpl for="stars"> <img src="'+GeoReview.getUrlImage('star')+'" /> </tpl> <br/> {comment} </div>'
    }
    ],

    listeners: {
        activate: function(){
            Ext.getCmp('back').addToBackStack({ controller: 'MapController', action: 'showMap' });
        }
    }
});
