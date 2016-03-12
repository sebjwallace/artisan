
/// <reference path="Observable.ts"/>

class StylesContainer extends Observable{

  private target = "body";
  private id = "artisan-styles-container";
  private lastStyleDefined = false;
  private container;

  constructor(private selectedElement){
    super();

    this.selectedElement.observe(this.updateIdName, "newIdName");

    var code = '<style id="' + this.id + '" artisan-breakpoint="0 > 1200" artisan-breakpoint-max="1200"></style>';
    $(this.target).append(code);

    this.container = $("#" + this.id);
  }

  getStyle(attribute){
      var id = this.selectedElement.getId();
      var code = this.container.html();
      var idIndex = code.indexOf(id);
      var endIndex = code.indexOf("}", idIndex);
      var sample = code.substring(0, endIndex);
      var attrIndex = sample.indexOf(";" + attribute + ":", idIndex);
      var closeIndex = sample.indexOf(";", attrIndex + attribute.length); // attrIndex + 1 for the : before
      var result = code.substring(attrIndex + 1 + attribute.length + 1, closeIndex);
      this.lastStyleDefined = true;
      if (attrIndex == -1) {
          result = this.selectedElement.getValue(attribute);
          this.lastStyleDefined = false;
      }
      return result;
  }

  setStyle(attribute, style){
    if (style.indexOf(" px") != -1 || style.indexOf(" %") != -1 || style.indexOf(" em") != -1) {
        style = style.substring(0, style.indexOf(" "));
    }
    let id = this.selectedElement.getId();
    let code = this.container.html();
    let idIndex = code.indexOf(id);
    if (idIndex == -1) {
        if (this.selectedElement.getMode() == "id") {
            code += "#" + id + "{}";
        } else {
            code += "." + id + "{}";
        }
        idIndex = code.indexOf(id);
    }
    let endIndex = code.indexOf("}", idIndex);
    let sample = code.substring(0, endIndex);
    let attrIndex = sample.indexOf(";" + attribute + ":", idIndex);
    let closeIndex = sample.indexOf(";", attrIndex + attribute.length);
    if (attrIndex == -1) {
        closeIndex = code.indexOf("}", idIndex);
        code = code.substring(0, closeIndex) + attribute + ":" + style + ";" + code.substring(closeIndex);
    } else { // attribute+2 for ; before and : after
        code = code.substring(0, attrIndex + attribute.length + 2) + style + code.substring(closeIndex);
    }
    this.container.html(code);
    this.update(attribute);
  }

  updateIdName(currentId,newId){
    var code = this.container.html();
    code = code.replace("#" + currentId, "#" + newId);
    this.container.html(code);
  }

  wasStyleDefined(){
    return this.lastStyleDefined;
  }

  setContainer($newContainer){
    this.container = $newContainer;
    this.update("setContainer");
  }

}
