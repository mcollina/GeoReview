GeoReview.models.insertReview = function(values){
    Ext.Ajax.request({
        url: GeoReview.getUrl('reviews'),
        method: 'POST',
        limitParam: undefined,
        noCache: false,
        cacheString: undefined,
        reader: {
            type: 'json',
            root: 'status'
        },
        params: {
            "review[name]": values.name,
            "review[stars]": values.stars,
            "review[comment]": values.comment,
            "review[location]": values.latLng.lat() + ";" + values.latLng.lng()
        },
        success: function(response,opt) {
            var res = Ext.decode(response.responseText);
            Ext.Msg.height  = 200;
            if (res.status){
                Ext.Msg.alert('Congratulations', 'Your review has been inserted successfully!', function(){
                    GeoReview.resetMsgBox();
                    Ext.dispatch({
                        controller: 'MapController',
                        action: 'showMap',
                        historyUrl: 'index'
                    })
                    GeoReview.views.insertReview.resetForm();
                    GeoReview.views.insertReview.getComponent('loadingLeave').hide();
                }); 
            }else{
                var err = res.errors.join("<br/>");
                Ext.Msg.alert('Errore', err, function(){
                    GeoReview.resetMsgBox();
                    GeoReview.views.insertReview.getComponent('loadingLeave').hide();
                }); 
            }
        },
        failure: function(){
            // TODO
        }
    });
}


GeoReview.models.loadReview = function(pos){
    Ext.Ajax.request({
        url: GeoReview.getUrl('reviews'),
        method: 'GET',
        limitParam: undefined,
        noCache: true,
        cacheString: undefined,
        reader: {
            type: 'json',
            root: 'status'
        },
        params: {
            "lat": pos.lat,
            "lng": pos.lng,
            "radius": pos.radius
        },
        success: function(response, opt){
            var res = Ext.decode(response.responseText);
//            console.log(res.reviews);
            if (res.status) GeoReview.views.map.showReviews(res.reviews);
            else {
                // TODO
            }
        },
        failure: function(){
            // TODO
        }
    });
};

GeoReview.models.Review = Ext.regModel("GeoReview.models.Review", {
    fields: [
        {name: "stars", type: "array"},
        {name: "name", type: "string"},
        {name: "comment", type: "string"}
    ]
});

GeoReview.models.listReview = new Ext.data.Store({
    autoLoad: false,
	model: 'GeoReview.models.Review',
	records: null,
	load: function(records){
	    this.records = records;
	    this.removeAll();
	    var dataArr=[];
        var count = 0;
	    while (count< records.length){
	        var newEl = new Array();
	        for (i = 0; i < records[count].stars; i++){
	            newEl.push(i);
	        }
            dataArr.push({ 'name': records[count].name, 'stars': newEl, 'comment': records[count].comment});
            count ++;
	    }
        this.loadData(dataArr);
	}
});
