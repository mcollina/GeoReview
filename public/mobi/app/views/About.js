
GeoReview.views.AboutPanel = Ext.extend(Ext.Panel, {

    // The title is shown only in the tab panel
    title: "About",

    // The icon used by the tab panel
    // 'info' is just a stock icon inside Sencha Touch
    iconCls: 'info',

    // inline CSS
    style: 'text-align: center;',

    // or define a CSS class
    // cls: 'myclass',

    html: '<img src="/mobi/resources/images/mavigex.png" /> <div class="box-about">Mavigex Srl <br /><br />Matteo: .... <br />Daniele: .... </div>',

    listeners: {
        activate: function() {
            Ext.getCmp("back").clearBackStack();
        }
    }
});
