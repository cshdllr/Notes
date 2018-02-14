var kNoteScaleKey = "com.jasoncashdollar.sketchplugins.notes.scale";
var kNoteColorKey = "com.jasoncashdollar.sketchplugins.notes.color";

var editSettings = function(context) {
  log("open settings");
  
  // create settings window
  var settingsWindow = COSAlertWindow.new();
  settingsWindow.setMessageText("Notes Settings");
  settingsWindow.addButtonWithTitle("Save");
  settingsWindow.addButtonWithTitle("Cancel");
  settingsWindow.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path()));
  
  // add scaling options
  settingsWindow.addTextLabelWithValue("Scale Options");
  var scaleOptions = [1, 2, 3];
  var numOptions = scaleOptions.length;
  var exportScale = NSUserDefaults.standardUserDefaults().objectForKey(kNoteScaleKey) || 1;
  var buttonCell = NSButtonCell.new();
  buttonCell.setTitle("settings-scaleOptions");
  buttonCell.setButtonType(NSRadioButton);
  
  var scaleOptionsMatrix = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(NSMakeRect(0, 0, 300, 22), NSRadioModeMatrix, buttonCell, 1, numOptions);
  scaleOptionsMatrix.setAutorecalculatesCellSize(true);
  scaleOptionsMatrix.setIntercellSpacing(NSMakeSize(-50,0));
  var cells = scaleOptionsMatrix.cells();
  var scaleOption;
  
  for (var i = 0; i<numOptions; i++) {
    scaleOption = scaleOptions[i];
    cells.objectAtIndex(i).setTitle(scaleOption + "x");
    if (exportScale == scaleOption) {
      scaleOptionsMatrix.selectCellAtRow_column(0, i);
    }
  }
  
  // add the scaling options to the modal
  var exportOptionsView = NSView.alloc().initWithFrame(NSMakeRect(0,0,300,30));
  exportOptionsView.addSubview(scaleOptionsMatrix);
  settingsWindow.addAccessoryView(exportOptionsView);
  
  // note color option
  settingsWindow.addTextLabelWithValue("Note Color");
  //  NSArray.arrayWithObjects needed to be replaced by arrayWithArray
  var colorOptionNames = NSArray.arrayWithArray(["Yellow", "Blue", "Green", "Red", "Purple"]);
  var colorOptions = NSArray.arrayWithArray(["Yellow", "Blue", "Green", "Red", "Purple"]);
  var noteColor = NSUserDefaults.standardUserDefaults().objectForKey(kNoteColorKey) || "Yellow";
  var colorDropdown = NSPopUpButton.alloc().initWithFrame_pullsDown(NSMakeRect(0,0,200,22), false);
  selectedIndex = colorOptions.indexOfObject(noteColor);
  colorDropdown.addItemsWithTitles(colorOptionNames);
  colorDropdown.selectItemAtIndex(selectedIndex);
  settingsWindow.addAccessoryView(colorDropdown);
  
  var response = settingsWindow.runModal();
  
  // if they click save
  if (response == "1000") {
    // save the color and resolution for use later
    var exportScale = parseInt(scaleOptionsMatrix.selectedCell().title());
    
    var noteColor = colorDropdown.titleOfSelectedItem();
    
    NSUserDefaults.standardUserDefaults().setObject_forKey(exportScale, kNoteScaleKey);
    NSUserDefaults.standardUserDefaults().setObject_forKey(noteColor, kNoteColorKey);
  }
  return settingsWindow;
}