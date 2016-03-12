
/// <reference path="Overlay.ts"/>

class OverlayMargin extends Overlay{

    constructor(){
      super();

      this.attribute = "margin";
      this.value = "";
      this.color = "rgba(255, 195, 80, 0.5);";
      this.container = "artisan-overlay-" + this.attribute;
    }

    update = (selectedElement) => {
        selectedElement;
        var top = selectedElement.getValue('margin-top');
        var bottom = selectedElement.getValue('margin-bottom');
        var left = selectedElement.getValue('margin-left');
        var right = selectedElement.getValue('margin-right');
        var borderTop = "border-top-width:" + top + ";";
        var borderBottom = "border-bottom-width:" + bottom + ";";
        var borderLeft = "border-left-width:" + left + ";";
        var borderRight = "border-right-width:" + right + ";";
        var style = "position:absolute;width:100%;height:100%;border:1px solid " + this.color + ";" + borderTop + borderBottom + borderLeft + borderRight + "top:-" + top + ";left:-" + left + ";";
        var margin = "<div style='" + style + "'></div>";
        $("#" + this.container).html(margin);
    }

}
