
GeoReview.views.InsertReviewPanel = Ext.extend(Ext.Panel, {

  // inline CSS
  style: 'text-align: center;',

  layout: { 
    // all the contained items are layed out 
    // vertically
    type: 'vbox'
  },

  items: [
    {
      id: 'position',
      xtype: 'panel'
  }],

  updateWithPosition: function(latLng) {
    this.getComponent('position').update('Position: <img src="/mobi/resources/images/loading.gif">');

    var that = this;
    (new google.maps.Geocoder()).geocode({ location: latLng }, function(results) { 
      that.getComponent('position').update('Position: ' + results[0].formatted_address);
    });
  }
});
