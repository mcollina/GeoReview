// This creates a GeoReview object in the global namespace
// that contains the entire application
Ext.regApplication({
    // this is defined by us in which we put global variables

    // the application name
    name: "GeoReview",
    tabletStartupScreen: "/mobi/resources/images/tablet_startup_screen.png",
    phoneStartupScreen: "/mobi/resources/images/phone_startup_screen.png",
    icon: "/mobi/resources/images/icon_app.png",

    // this function is called by Sencha Touch to startup the
    // application
    realLaunch: function() {   
        GeoReview.views.viewport = new this.views.Viewport();
    },
    mainLaunch: function(){
		if (!window.device || !this.launched) { return true; }
		this.realLaunch();
	},
	launch: function() {
		if (!(window.device == undefined)){
			this.launched=true;
			this.mainLaunch();  
		}else{
			this.realLaunch();    
		}
	},
    re: new RegExp("(.+)\\?(.+)"),
    position: {},
    callback: null,
    getPosition: function(position){
        GeoReview.position.lat = position.coords.latitude;
        GeoReview.position.lng = position.coords.longitude;
        GeoReview.callback();
    },
    // global variable to store
    // the status of the workflow
    fromMarker: false, 
    resetMsgBox: function() {
        Ext.Msg = new Ext.MessageBox();
        Ext.Msg.on({
            hide: function(component) { component.destroy(); },
            destroy: function(component) { GeoReview.resetMsgBox(); }
        });
    },

    loadCss: function(color) {
        if (color == null || color == undefined) {
            color = localStorage.getItem('color');
            if (color == null) color = "gray";
        }
        var headID = document.getElementsByTagName("head")[0];         
        var cssNode = document.createElement('link');
        cssNode.type = 'text/css';
        cssNode.rel = 'stylesheet';
        cssNode.href = "mobi/resources/css/"+color+'/application.css';
        cssNode.media = 'screen';
        headID.appendChild(cssNode);
        localStorage.setItem('color',color);
    },
    
    getPath: function(){
        if (window.device == undefined) return '/mobi/resources';
        else return '/resources';
    },
    
    getUrlImage: function(image){
        switch (image){
            case 'mavigex':
                return GeoReview.getPath()+"/images/mavigex.png";
            case 'star':
                return GeoReview.getPath()+"/images/star.png";
            case 'star_empty':
                return GeoReview.getPath()+"/images/star_empty.png";
            case 'loading':
                return GeoReview.getPath()+"/images/loading.gif";
            default:
                return '';
        }
    }
});


// Monkey patching sencha to make Maps touch event work
// see http://www.sencha.com/forum/showthread.php?129126-Google-Maps-Listener-on-click
Ext.gesture.Manager.onMouseEventOld = Ext.gesture.Manager.onMouseEvent;
Ext.gesture.Manager.onMouseEvent = function(e) {
    var target = e.target;

    while (target) {
        if (Ext.fly(target) && Ext.fly(target).hasCls('x-map')) {
            return;
        }

        target = target.parentNode;
    }

    this.onMouseEventOld.apply(this, arguments);
};

