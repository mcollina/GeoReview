
(function () {
  var star_empty = "<img src='/mobi/resources/images/star_empty.png'>";
  var star = "<img src='/mobi/resources/images/star.png'>";

  GeoReview.views.Stars = Ext.extend(Ext.Panel, {

    id: 'stars',

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
    { id: 'position',
      xtype: 'panel' },
    new GeoReview.views.Stars(),
    { xtype: 'textfield', name: 'username', label: 'Name', id: 'username' },
    { xtype: 'textareafield', name: 'comment', label: 'Comment', id: 'comment' },
    { xtype: 'button', text: 'Leave a comment', 
      handler: function() {
        var owner = this.ownerCt;
        console.log(owner.getComponent('stars').value);
        console.log(owner.getComponent('username').getValue());
        console.log(owner.getComponent('comment').getValue());
    }}
  ],

  updateWithPosition: function(latLng) {
    this.getComponent('position').update('Position: <img src="/mobi/resources/images/loading.gif">');

    var that = this;
    (new google.maps.Geocoder()).geocode({ location: latLng }, function(results) { 
      that.getComponent('position').update('Position: ' + results[0].formatted_address);
    });
  }
});
