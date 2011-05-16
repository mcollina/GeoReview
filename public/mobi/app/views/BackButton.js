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
    var found = false;
    this.backStack.forEach(function(el) {
      found = found || (Ext.encode(el) == Ext.encode(dispatchOptions));
    });
    if (!found) {
      this.backStack.push(dispatchOptions);
    }
    this.show();
  },

  clearBackStack: function() {
    this.backStack = [];
    this.hide();
  }
});
