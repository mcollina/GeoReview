
(function () {
    var star_empty = "<img src='"+GeoReview.getUrlImage('star_empty')+"'>";
    var star = "<img src='"+GeoReview.getUrlImage('star')+"'>";

    GeoReview.views.Stars = Ext.extend(Ext.Panel, {

        id: 'stars',
        height: 40,

        layout: { 
            // all the contained items are layed out 
            // orizontally
            type: 'hbox'
        },

        // all the properties in the defaults
        // are applied to all items in the 
        // panel
        defaults: {
            html: star_empty,
            listeners: {
                afterrender: function() {
                    var that = this;

                    // this.el is filled in the 
                    // rendering process
                    // this feature is not well documented
                    this.el.on('tap', function() {
                        // in this way we can get the owner
                        // it's not documented, but it's plain
                        // old Ext.js
                        that.ownerCt.toggleStars(that.value);
                    });
                }
            }
        },

        items: [
            { value: 1 },
            { value: 2 },
            { value: 3 },
            { value: 4 },
            { value: 5 }
        ],

        value: 0,

        toggleStars: function(index) {
            this.value = index;

            for(var i=0; i < 5; i++) {
                if ( i < index ) {
                    this.items.getAt(i).update(star);
                } else {
                    this.items.getAt(i).update(star_empty);
                }
            }
        },

        listeners: {
            afterrender: function() {
                this.toggleStars(1);
            }
        }
    });
})();


GeoReview.views.InsertReviewPanel = Ext.extend(Ext.Panel, {

    // inline CSS
    style: 'text-align: center;',

    layout: { 
        // all the contained items are layed out 
        // vertically
        type: 'vbox'
    },

    items: [
        { id: 'position', xtype: 'panel', cls: 'title', height: 50 },
        new GeoReview.views.Stars(),
        { xtype: 'textfield', name: 'username', width: '90%', label: 'Name', id: 'username', style: 'border: 1px solid black;'},
        { height: 15 },
        { xtype: 'textareafield', name: 'comment',  width: '90%', label: 'Comment', id: 'comment', style: 'border: 1px solid black;'},
        { height: 15 },
        { xtype: 'button', ui: 'action', text: 'Leave a comment', 
            handler: function() {
                var owner = this.ownerCt;
                owner.getComponent('loadingLeave').show();
                GeoReview.models.insertReview( { stars: owner.getComponent('stars').value, name: owner.getComponent('username').getValue(), comment: owner.getComponent('comment').getValue(), latLng: owner.latLng });
            }},
        { html: '<img src="'+GeoReview.getUrlImage('loading')+'" />', id:'loadingLeave', hidden: true }
    ],

    resetForm: function(){
        this.getComponent('stars').toggleStars(1);
        this.getComponent('username').reset();
        this.getComponent('comment').reset();
    },

    latLng: null,
    updateWithPosition: function(latLng) {
        this.getComponent('position').update('Position: <img src="'+GeoReview.getUrlImage('loading')+'" />');
        this.latLng = latLng;
        var that = this;
        (new google.maps.Geocoder()).geocode({ location: latLng }, function(results) { 
            that.getComponent('position').update('Position: ' + results[0].formatted_address);
        });

    },

    listeners: {
        activate: function() {
			if (navigator.onLine) Ext.getCmp('back').addToBackStack({ controller: 'MapController', action: 'showMap' });
			else GeoReview.views.mapContainer.setOffline();
        }
    }
});

