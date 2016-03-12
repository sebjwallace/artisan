
/// <reference path="SelectedElement.ts" />
/// <reference path="ElementsContainer.ts"/>
/// <reference path="StylesContainer.ts"/>
/// <reference path="ElementSelector.ts"/>
/// <reference path="OverlayContainer.ts"/>
/// <reference path="OverlayPadding.ts"/>
/// <reference path="OverlayMargin.ts"/>
/// <reference path="OverlayManipulator.ts"/>

declare var REG: any;
declare var GET: any;
declare var $: any;
declare var html2json: any;

let selectedElement = new SelectedElement();
REG('selectedElement', () => {return selectedElement});

let elementsContainer = new ElementsContainer(GET('selectedElement'));
REG('elementsContainer',() => {return elementsContainer});

let stylesContainer = new StylesContainer(GET('selectedElement'));
REG('stylesContainer',() => {return stylesContainer});

let overlayContainer = new OverlayContainer(GET('selectedElement'),GET('stylesContainer'));
let overlayPadding = new OverlayPadding();
let overlayMargin = new OverlayMargin();
overlayContainer.addOverlay(overlayPadding);
overlayContainer.addOverlay(overlayMargin);
overlayContainer.render();
REG('overlayContainer',() => {return overlayContainer});

let elementSelector = new ElementSelector(GET('selectedElement'));
REG('elementSelector',() => { return elementSelector; });

REG('overlayManipulator',(attributes,position) => {
  return new OverlayManipulator(attributes,position,
    GET('stylesContainer'), GET('overlayContainer'), GET('selectedElement'));
});

let _top = GET('overlayManipulator',["top"],"top");
let topLeft = GET('overlayManipulator',["top", "left"], "top-left");
let left = GET('overlayManipulator',["left"], "left");
let right = GET('overlayManipulator',["width"], "right");
let bottom = GET('overlayManipulator',["height"], "bottom");
let bottomLeft = GET('overlayManipulator',["width", "height"]);

let classManager = new ClassManager();
REG('classManager',() => {return classManager;})

REG('ClassSorter',() => {
  return new ClassSorter(GET('classManager'), GET('selectedElement'));
});

REG('StyleToggle',(attribute) => {
  return new StyleToggle(GET('selectedElement'), GET('stylesContainer'), attribute);
});

REG('StyleToggleSlider',(attributes) => {
  return new StyleToggleSlider(GET('selectedElement'), GET('stylesContainer'), attributes);
});

REG('StyleSwitch',(attribute,buttons) => {
    return new StyleSwitch(attribute, buttons, GET('stylesContainer'), GET('selectedElement'))
});

REG('FilePicker',(attribute) => {
  return new FilePicker(attribute, GET('stylesContainer'), GET('selectedElement'));
});

REG('ColorPicker',(attribute) => {
  return new ColorPicker(attribute, GET('stylesContainer'), GET('selectedElement'));
});

let breakpointsManager = new BreakpointsManager(GET('stylesContainer'));
REG('breakpointsManager',() => {return breakpointsManager});

REG('BreakpointsSorter', () => {
  return new BreakpointsSorter(GET('breakpointsManager'), GET('overlayContainer'));
});

let pageLoader = new PageLoader();
REG('pageLoader',() => {return pageLoader});

let panelContainer = new PanelContainer(GET('selectedElement'));


REG('layersPanel',() => { return new LayersPanel(GET('selectedElement')); });

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
