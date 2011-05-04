GeoReview.views.BackButton = Ext.extend(Ext.Button, {
  ui: 'back', 
  text: 'Back', 
  hidden: true, 
  id: 'back',

  handler: function() {
    var dispatchOptions = this.backStack.pop();
    Ext.dispatch(dispatchOptions);
    if(this.backStack.length == 0) {
      this.hide();
    }
  },

  backStack: [],

  addToBackStack: function(dispatchOptions) {
    this.backStack.push(dispatchOptions);
    this.show();
  },

  clearBackStack: function() {
    this.backStack = [];
    this.hide();
  }
});
