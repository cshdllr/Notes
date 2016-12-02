var onRun = function(context) {

  const doc = context.document;
  const view = [[doc currentView] visibleContentRect];
  const page = doc.currentPage();

  const width = 200;
  const height = 200;
  const x = Math.round(view.origin.x + view.size.width/2 - width/2);
  const y = Math.round(view.origin.y + view.size.height/2 - height/2);
  const padding = 10;
  const noteColor = MSColor.colorWithRed_green_blue_alpha(255/255, 242/255, 133/255, 1.0);

  // the square for the note
  const rectangleLayer = MSRectangleShape.alloc().init();
  rectangleLayer.frame().setWidth(width);
  rectangleLayer.frame().setHeight(height);
  rectangleLayer.cornerRadiusFloat = 2;

  const shapeGroup = MSShapeGroup.alloc().init();
  shapeGroup.frame().setWidth(width);
  shapeGroup.frame().setHeight(height);
  shapeGroup.frame().setX(x);
  shapeGroup.frame().setY(y);
  shapeGroup.setName("Post-it®");
  const styleType = 0; //  0 = fill
  const shadowType = 2;
  const fill = shapeGroup.style().addStylePartOfType(styleType);
  fill.color = noteColor;
  shapeGroup.style().addStylePartOfType(shadowType);
  shapeGroup.addLayers( [rectangleLayer] );

  // the text of the note
  const textLayer = MSTextLayer.alloc().init();
  textLayer.frame().setWidth(width - 2*padding);
  textLayer.frame().setHeight(height - 2*padding);
  textLayer.frame().setX(x + padding);
  textLayer.frame().setY(y + padding);
  textLayer.setName("Note");
  const fixedBehaviour = 1;
  textLayer.setTextBehaviour(fixedBehaviour);
  textLayer.setStringValue("Take some notes...");
  textLayer.setFontSize(14);

  const group = MSLayerGroup.alloc().init();
  group.addLayers( [shapeGroup, textLayer] );
  group.setName("Note");
  page.addLayers( [group] );

  textLayer.select_byExpandingSelection(true,false); // select text layer

}
