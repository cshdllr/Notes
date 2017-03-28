var setTaggedLayersVisible = function(context, visible) {
  var command = context.command;        // The current command (MSPluginCommand)
  var doc = context.document;                // the current document (MSDocument)
  var page = doc.currentPage();         // the current page (MSPage)
  var layers = page.children();       // A flattened array (NSArray) of all layers in `page`
  
  // Loop through each layer on the page searching for the note attribute
  for (var i=0; i<[layers count]; i++) {
    var layer = layers[i];
    // test for the "tagged" attribute
    if ([command valueForKey:"note" onLayer:layer]) {
      // toggle this layer's visiblity
//      [layer setIsVisible:visible];
      
      layer.setIsVisible(visible);
    }
  }
};

var showNotes = function(context) {
  setTaggedLayersVisible(context, true);
};

var hideNotes = function(context) {
  setTaggedLayersVisible(context, false);
};