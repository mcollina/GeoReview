GeoReview.views.ListReview = Ext.extend(Ext.Panel, {

  // inline CSS
  style: 'text-align: center;',

  dockedItems: [
   // { dock: 'bottom', html: "Click on the map to leave a review" },
   { dock: 'bottom', height: 30, style: 'text-align: center;', items: [
    {
        xtype: 'button',
        height: 20,
        width: 200,
        text: 'Leave a comment',
        handler: function(){
            Ext.getCmp('back').addToBackStack({ controller: 'MapController', action: 'showList', latLng: GeoReview.views.listReview.latLng, records: GeoReview.models.listReview.records });
            Ext.dispatch({ 
              controller: "MapController", 
              action: "insert", 
              latLng: GeoReview.views.listReview.latLng,
              historyUrl: "insert" 
            });
        }
    }
   ] },
   
   {
     id: 'positionList', dock: 'top', height: 50 
   }
  ],
  
  layout: {
    type: 'fit',
    align: 'stretch'
  },
  
  latLng: null,
  updateWithPosition: function(latLng) {
    this.getDockedComponent('positionList').update('Position: <img src="/mobi/resources/images/loading.gif">');
    this.latLng = latLng;
    var that = this;
    (new google.maps.Geocoder()).geocode({ location: latLng }, function(results) { 
      that.getComponent('positionList').update('Position: ' + results[0].formatted_address);
    });

    setTimeout("GeoReview.views.listReview.releaseFromMarker()",1500);
  },
  
  releaseFromMarker: function(){
     document.fromMarker = false;
  },

  items: [
    
    {
        xtype: 'list',
        store: GeoReview.models.listReview,
        singleSelect: false,
        disableSelection: true,
        itemTpl: '<div style="text-align: left; padding-left: 5px">{name} <br/> <tpl for="stars"> <img src="mobi/resources/images/star.png" /> </tpl> <br/> {comment} </div>'
    }
  ],
  
  listeners: {
    activate: function(){
        Ext.getCmp('back').addToBackStack({ controller: 'MapController', action: 'showMap' });
    }
  }

});
