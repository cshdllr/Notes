var onRun = function(context) {

  // todo
  // [x] get size of view
  // [x] center note
  // [x] change color of rectangle
  // [ ] size rectangle based on view size
  // [ ] size type based on view size
  // [ ] place note based on mouse position

  const doc = context.document;
  const docRect = [[doc currentView] visibleContentRect];

  const width = 200;
  const height = 200;
  const x = Math.round(docRect.origin.x + docRect.size.width/2 - width/2);
  const y = Math.round(docRect.origin.y + docRect.size.height/2 - height/2);
  const padding = 10;

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
  const fillType = 0;
  const shadowType = 2;
  const fill = shapeGroup.style().addStylePartOfType(fillType);
  fill.color = MSColor.colorWithRed_green_blue_alpha(255/255, 236/255, 77/255, 1.0);
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
  textLayer.setStringValue('Take some notes');

  const group = MSLayerGroup.alloc().init();
  group.addLayers( [shapeGroup, textLayer] );
  group.setName("Note");

  context.document.currentPage().addLayers( [group] );

  textLayer.select_byExpandingSelection(true,false);
}
