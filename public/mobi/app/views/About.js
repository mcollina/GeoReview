
(function() {
    var desc = "Mavigex is an academic spin-off of the University of Bologna which focuses on:"
    desc = desc + "<ul><li>Mobile applications</li><li>Digital signage</li><li>VoIP applications</li>"
    desc = desc + "<li>Mobile broadcasting</li></ul>"

    var georeview = "GeoReview is OSS code released on <a href=\"https://github.com/mcollina/GeoReview\">GitHub</a>"

    GeoReview.views.AboutPanel = Ext.extend(Ext.Panel, {

        // The title is shown only in the tab panel
        title: "About",

        // The icon used by the tab panel
        // 'info' is just a stock icon inside Sencha Touch
        iconCls: 'info',

        // inline CSS
        style: 'text-align: center;',
        
        cls: 'about',

        // or define a CSS class
        // cls: 'myclass',

        html: '<img src="'+GeoReview.getUrlImage('mavigex')+'" /> <div class="box-about">' + desc + '<br />' + georeview + '</div>',

        listeners: {
            activate: function() {
                Ext.getCmp("back").clearBackStack();
            }
        }
    });
})();
