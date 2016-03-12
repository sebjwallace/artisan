class StyleToggle{

  private value;
  private id;

  constructor(private selectedElement, private stylesContainer, private attribute){

    selectedElement.observe(this.update, "newSelectedElement");
    selectedElement.observe(this.update, "classModeOn");
    selectedElement.observe(this.update, "classModeOff");
    stylesContainer.observe(this.update, attribute);
    stylesContainer.observe(this.update, "setContainer");

    this.id = "artisan-style-toggle-" + attribute;

  }

  getManipId() {
      return this.id;
  }

  onProcess(e) {
      this.stylesContainer.setStyle(this.attribute, e.pageX);
  }

  onEnd() {
      console.log('complete');
  }

  onStart() {
      let value = this.stylesContainer.getStyle("height");
      console.log('start');
  }

  update = () => {
      $("#" + this.id).val(this.stylesContainer.getStyle(this.attribute));
      if (this.stylesContainer.wasStyleDefined() == true) {
          $("#" + this.id).css("border-color", "orange");
      } else {
          $("#" + this.id).css("border-color", "rgba(0,0,0,0.25)");
      }
  }

  render() {
      let changeEvent = "onchange='GET(\"stylesContainer\").setStyle(\"" + this.attribute + "\",this.value)';";
      let code = "<select id='" + this.id + "' class='artisan-style-toggle' " + changeEvent + ">";
      let options = this.getOptions(this.attribute);
      for (let option in options) {
          code += "<option value='" + options[option] + "'>" + options[option] + "</option>";
      }
      code += "</select>";
      return code;
  }

  getOptions(attribute) {
      let options = "unit,initial,unset,inherit,";
      if (attribute == "background-attachment") {
          options += "scroll,local,fixed";
      } else if (attribute == "background-color") {
          options += "transparent";
      } else if (attribute == "position") {
          options += "static,sticky,relative,page,fixed,center,absolute";
      } else if (attribute == "background-position") {
          options += "right,bottom,left,top,center";
      } else if (attribute == "background-repeat") {
          options += "repeat,space,round,repeat-y,repeat-x,no-repeat";
      } else if (attribute == "top" || attribute == "bottom" || attribute == "left" || attribute == "right") {
          options += "auto";
      } else if (attribute == "display") {
          options += "inline,block,inline-block,table-row-group,table-row,table-header-group,table-footer-group," + "table-column-group,table-column,table-cell,table-caption,table,run-in,run-in,none," + "list-item,inline-table,inline-flex,flex,container,compact";
      } else if (attribute == "font-size") {
          options += "medium,xx-small,xx-large,x-small,x-large,smaller,small,larger,large";
      } else if (attribute == "letter-spacing") {
          options += "normal";
      } else if (attribute == "line-height") {
          options += "normal";
      } else if (attribute == "background-size") {
          options += "auto,cover,contain";
      }
      return options.split(",");
  }
}
