GeoReview.views.Viewport = Ext.extend(Ext.TabPanel, {

    // we need at least one Panel with
    // fullscreen = true
    fullscreen: true,

    // default layout for TabPanel
    layout: 'card',

    // default animation for the card switch
    cardSwitchAnimation: 'slide',

    // this is the toolbar at the top
    dockedItems: [
        {
        xtype: 'toolbar',
        title: 'GeoReview',
        items: [
            new GeoReview.views.BackButton(), { xtype: 'spacer' }, {
            xtype: 'button',
            ui: 'action',
            text: 'Color',
            handler: function(){
                var picker = new Ext.Picker({
                    slots: [
                        {
                        name : 'color',
                        title: 'Choose a color',
                        data : [
                            {text: 'Blue', value: 'blue'},
                            {text: 'Red', value: 'red'},
                            {text: 'Grey', value: 'gray'},
                            {text: 'Yellow', value: 'yellow'},
                            {text: 'Green', value: 'green'},
                        ]
                    }
                    ],
                    listeners: { 
                        "hide": function(picker) { 
                            GeoReview.loadCss(picker.getValue().color);
                        }
                    }});
                    picker.show();
            }
        }
        ] // end items
    }],

    // the tab bar at the bottom
    tabBar: { dock: 'bottom', layout: { pack: 'center' } },

    // if we wanted to listen for some events
    // we would put the methods here
    listeners: { 
    }, 

    initComponent: function (){

        // create the main two panels
        var views = new Object();
        views.mapContainer = new GeoReview.views.MapContainerPanel();
        views.about = new GeoReview.views.AboutPanel();

        // Adds to GeoReview.views the just created 
        // panels
        Ext.apply(GeoReview.views, views);

        var items = new Array();
        items.push(GeoReview.views.mapContainer);
        items.push(GeoReview.views.about);

        // Adds to the current panel's items 
        // the just created panels
        Ext.apply (this, {
            items: items
        });

        // call the superclass
        GeoReview.views.Viewport.superclass.initComponent.apply(this, arguments);
    } 
});
