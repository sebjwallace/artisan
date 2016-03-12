
/// <reference path="Overlay.ts"/>

class OverlayPadding extends Overlay{

  constructor(){
    super();

    this.attribute = "padding";
    this.color = "rgba(86, 146, 255, 0.5)";
    this.container = "artisan-overlay-" + this.attribute;
  }

  update = (el) => {
      var top = el.getValue('padding-top');
      var bottom = el.getValue('padding-bottom');
      var left = el.getValue('padding-left');
      var right = el.getValue('padding-right');
      var styleTop = "box-shadow: inset 0px " + top + " 0px 0px " + this.color + ";";
      var styleBottom = "box-shadow: inset 0px -" + bottom + " 0px 0px " + this.color + ";";
      var styleLeft = "box-shadow: inset " + left + " 0px 0px 0px " + this.color + ";";
      var styleRight = "box-shadow: inset -" + right + " 0px 0px 0px " + this.color + ";";
      var topPadding = "<div style='position:absolute;width:100%;height:100%;" + styleTop + ";'></div>";
      var bottomPadding = "<div style='position:absolute;width:100%;height:100%;" + styleBottom + ";'></div>";
      var leftPadding = "<div style='position:absolute;width:100%;height:100%;" + styleLeft + ";'></div>";
      var rightPadding = "<div style='position:absolute;width:100%;height:100%;" + styleRight + ";'></div>";
      $("#" + this.container).html(topPadding + bottomPadding + leftPadding + rightPadding);
  }

}
