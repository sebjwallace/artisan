
/// <reference path="Observable.ts"/>

class SelectedElement extends Observable{

  private selectedElement = {};
  private mode = "id";
  private selectedClass = "";

  setSelectedElement(newSelectedElement){
    if (!$(this.selectedElement).is(newSelectedElement)){
        this.selectedElement = newSelectedElement;
        this.update("newSelectedElement");
        return true;
    } else {
        return false;
    }
  }

  getValue(attribute, asNumber) {
      var value = $("#" + $(this.selectedElement).attr('id')).css(attribute);
      if (asNumber) {
          return parseFloat(value);
      } else {
          return value;
      }
  }

  getOffsets(){
      return $(this.selectedElement).offset();
  }

  getDimensions(){
      var dimensions = {};
      var el = $(this.selectedElement);
      dimensions['height'] = el.css("height");
      dimensions['width'] = el.css("width");
      dimensions['outerHeight'] = el.outerHeight();
      dimensions['outerWidth'] = el.outerWidth();
      return dimensions;
  }

  getId(){
      if (this.mode == "class") {
          return this.selectedClass;
      } else {
          return $(this.selectedElement).attr('id');
      }
  }

  getParent(){
      return $(this.selectedElement).parent();
  }

  modeSwitch(mode){
      if (mode == "id" || mode == "class") {
          this.mode = mode;
          if (mode == "class") {
              this.update("classModeOn");
          } else {
              this.update("classModeOff");
          };
      } else {
          return false;
      }
  }

  setClass(name){
      if (name.indexOf(".") != -1) {
          name = name.replace(".", "");
      }
      this.selectedClass = name;
      this.modeSwitch("class");
  }

  addClass(name){
      name = name.replace(".", "");
      $(this.selectedElement).addClass(name);
      this.update("addClass");
  }

  changeId(name){
      var oldName = $(this.selectedElement).attr('id');
      if (!oldName) {
          return false;
      }
      $(this.selectedElement).attr('id', name);
      this.update("newIdName", oldName, name);
  }

  getClasses(){
      var classes = $(this.selectedElement).attr('class');
      if (classes) {
          return classes.split(" ");
      }
  }

  removeClass(name){
      if (name.indexOf(".") != -1) {
          name = name.replace(".", "");
      }
      $(this.selectedElement).removeClass(name);
      this.update("removeClass");
  }

  getMode(){
      return this.mode;
  }

}
