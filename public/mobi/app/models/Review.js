GeoReview.models.insertReview = function(values){
    Ext.Ajax.request({
        url: '/reviews',
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
                }); 
            }else{
                var err = res.errors.join("<br/>");
                Ext.Msg.alert('Errore', err, function(){
                    GeoReview.resetMsgBox();
                }); 
            }
        },
        failure: function(){
            // TODO
        }
    });
}
