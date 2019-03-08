var kNoteScaleKey = "com.jasoncashdollar.sketchplugins.notes.scale";
var kNoteColorKey = "com.jasoncashdollar.sketchplugins.notes.color";

var newNote = function (context) {
  log("starting new note");
  var doc = context.document;
  var view = doc.contentDrawView().visibleContentRect();
  var page = doc.currentPage();
  var command = context.command;
  
  var scale = NSUserDefaults.standardUserDefaults().objectForKey(kNoteScaleKey) || 1;
  var colorName = NSUserDefaults.standardUserDefaults().objectForKey(kNoteColorKey) || "Yellow";

  // could not get switch statement to work here...better done than perfect?
  if (colorName == "Yellow") {
    var color = MSColor.colorWithRed_green_blue_alpha(255/255, 242/255, 133/255, 1.0);
  } else if (colorName == "Blue") {
    var color = MSColor.colorWithRed_green_blue_alpha(188/255, 236/255, 255/255, 1.0);
  } else if (colorName == "Green") {
    var color = MSColor.colorWithRed_green_blue_alpha(199/255, 255/255, 190/255, 1.0);
  } else if (colorName == "Red") {
    var color = MSColor.colorWithRed_green_blue_alpha(255/255, 176/255, 176/255, 1.0);
  } else if (colorName == "Purple") {
    var color = MSColor.colorWithRed_green_blue_alpha(236/255, 191/255, 255/255, 1.0);
  }
  
  var width = 200 * scale;
  var height = 200 * scale;
  var x = Math.round(view.origin.x + view.size.width/2 - width/2);
  var y = Math.round(view.origin.y + view.size.height/2 - height/2);
  var padding = 10 * scale;
  var noteColor = color;

  // the square for the note
  var rectangleLayer = MSRectangleShape.alloc().init();
  rectangleLayer.frame().setWidth(width);
  rectangleLayer.frame().setHeight(height);
  rectangleLayer.cornerRadiusFloat = 2;
  
  var shapeGroup = MSShapeGroup.alloc().init();
  shapeGroup.frame().setWidth(width);
  shapeGroup.frame().setHeight(height);
  shapeGroup.frame().setX(x);
  shapeGroup.frame().setY(y);
  shapeGroup.setName("Paper");
  var styleType = 0; //  0 = fill
  var shadowType = 2;
  var fill = shapeGroup.style().addStylePartOfType(styleType);
  fill.color = noteColor;
  shapeGroup.style().addStylePartOfType(shadowType);
  shapeGroup.addLayers([rectangleLayer]);
  
  // the text of the note
  var textLayer = MSTextLayer.alloc().init();
  textLayer.frame().setWidth(width - 2*padding);
  textLayer.frame().setHeight(height - 2*padding);
  textLayer.frame().setX(x + padding);
  textLayer.frame().setY(y + padding);
  textLayer.setName("Note");
  var fixedBehaviour = 1;
  textLayer.setTextBehaviour(fixedBehaviour);
  textLayer.setStringValue("Press enter to start typing...");
  textLayer.setFontSize(14 * scale);

  var group = MSLayerGroup.alloc().init();
  group.addLayers( [shapeGroup, textLayer] );
  group.setName("Post-it®");
  page.addLayers( [group] );
  group.fixGeometryWithOptions(0);
  // add metadata to the layer
  [command setValue:true forKey:"note" onLayer:group];

  // select text layer
  textLayer.select_byExtendingSelection(true, false);
  log("end note creation");
}