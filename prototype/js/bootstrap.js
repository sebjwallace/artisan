/// <reference path="SelectedElement.ts" />
/// <reference path="ElementsContainer.ts"/>
/// <reference path="StylesContainer.ts"/>
/// <reference path="ElementSelector.ts"/>
/// <reference path="OverlayContainer.ts"/>
/// <reference path="OverlayPadding.ts"/>
/// <reference path="OverlayMargin.ts"/>
/// <reference path="OverlayManipulator.ts"/>
var selectedElement = new SelectedElement();
REG('selectedElement', function () { return selectedElement; });
var elementsContainer = new ElementsContainer(GET('selectedElement'));
REG('elementsContainer', function () { return elementsContainer; });
var stylesContainer = new StylesContainer(GET('selectedElement'));
REG('stylesContainer', function () { return stylesContainer; });
var overlayContainer = new OverlayContainer(GET('selectedElement'), GET('stylesContainer'));
var overlayPadding = new OverlayPadding();
var overlayMargin = new OverlayMargin();
overlayContainer.addOverlay(overlayPadding);
overlayContainer.addOverlay(overlayMargin);
overlayContainer.render();
REG('overlayContainer', function () { return overlayContainer; });
var elementSelector = new ElementSelector(GET('selectedElement'));
REG('elementSelector', function () { return elementSelector; });
REG('overlayManipulator', function (attributes, position) {
    return new OverlayManipulator(attributes, position, GET('stylesContainer'), GET('overlayContainer'), GET('selectedElement'));
});
var _top = GET('overlayManipulator', ["top"], "top");
var topLeft = GET('overlayManipulator', ["top", "left"], "top-left");
var left = GET('overlayManipulator', ["left"], "left");
var right = GET('overlayManipulator', ["width"], "right");
var bottom = GET('overlayManipulator', ["height"], "bottom");
var bottomLeft = GET('overlayManipulator', ["width", "height"]);
var classManager = new ClassManager();
REG('classManager', function () { return classManager; });
REG('ClassSorter', function () {
    return new ClassSorter(GET('classManager'), GET('selectedElement'));
});
REG('StyleToggle', function (attribute) {
    return new StyleToggle(GET('selectedElement'), GET('stylesContainer'), attribute);
});
REG('StyleToggleSlider', function (attributes) {
    return new StyleToggleSlider(GET('selectedElement'), GET('stylesContainer'), attributes);
});
REG('StyleSwitch', function (attribute, buttons) {
    return new StyleSwitch(attribute, buttons, GET('stylesContainer'), GET('selectedElement'));
});
REG('FilePicker', function (attribute) {
    return new FilePicker(attribute, GET('stylesContainer'), GET('selectedElement'));
});
REG('ColorPicker', function (attribute) {
    return new ColorPicker(attribute, GET('stylesContainer'), GET('selectedElement'));
});
var breakpointsManager = new BreakpointsManager(GET('stylesContainer'));
REG('breakpointsManager', function () { return breakpointsManager; });
REG('BreakpointsSorter', function () {
    return new BreakpointsSorter(GET('breakpointsManager'), GET('overlayContainer'));
});
var pageLoader = new PageLoader();
REG('pageLoader', function () { return pageLoader; });
var panelContainer = new PanelContainer(GET('selectedElement'));
REG('layersPanel', function () { return new LayersPanel(GET('selectedElement')); });
panelContainer.addPanel({
    name: 'Style',
    content: new StylesPanel().render()
});
panelContainer.addPanel({
    name: 'Points',
    content: new SheetsPanel().render()
});
panelContainer.addPanel({
    name: 'Layers',
    content: GET('layersPanel').render()
});
panelContainer.render();
