
/// <reference path="UnitMode.ts"/>

class OverlayManipulator{

  private prevX;
  private prevY;
  private startX;
  private startY;
  private id;
  private style;

  getManipId() {
      return this.id;
  }

  onEnd() {
      //console.log('complete');
  }

  constructor(
    private attributes,
    buttonPosition,
    private stylesContainer,
    private overlayContainer,
    private selectedElement) {

      if (buttonPosition == "top-left") {
          this.style = "top:-5px;left:-5px";
      } else if (buttonPosition == "top") {
          this.style = "top:-5px;left:50%";
      } else if (buttonPosition == "top-right") {
          this.style = "top:-5px;right:-5px";
      } else if (buttonPosition == "right") {
          this.style = "top:50%;right:-5px;";
      } else if (buttonPosition == "bottom-right") {
          this.style = "bottom:-5px;right:-5px;";
      } else if (buttonPosition == "bottom") {
          this.style = "bottom:-5px;left:50%;";
      } else if (buttonPosition == "bottom-left") {
          this.style = "bottom:-5px;left:-5px;";
      } else if (buttonPosition == "left") {
          this.style = "top:50%;left:-5px;";
      }
      this.render(overlayContainer);
      this.startX = 0;
      this.startY = 0;

  }

  render = (overlayContainer) => {
      var attributes = "";
      for (let attribute in this.attributes) {
          attributes += "-" + this.attributes[attribute];
      }
      var id = "artisan-overlay-controller" + attributes;
      var code = "<div id='" + id + "' class='artisan-overlay-controller' style='" + this.style + "'></div>";
      overlayContainer.appendToContainer(code);
      $("#" + id).mousedown((event) => {
          this.onStart(event);
          $(document).mousemove((event) => {
              this.onProcess(event);
          });
          $(document).mouseup((event) => {
              //this.onEnd(event);
              $(document).unbind("mousemove");
              $(document).unbind("mouseup");
          });
      });
  }

  onStart = (e) => {
      this.startX = e.pageX;
      this.startY = e.pageY;
      for (let _attribute in this.attributes) {
          var attribute = this.attributes[_attribute];
          if (attribute == "top" || attribute == "bottom" || attribute == "height") {
              var prevY = parseFloat(this.stylesContainer.getStyle(attribute));
              if (isNaN(prevY)) {
                  prevY = 0;
              }
              this.prevY = prevY;
          } else {
              var prevX = parseFloat(this.stylesContainer.getStyle(attribute));
              if (isNaN(prevX)) {
                  prevX = 0;
              }
              this.prevX = prevX;
          };
      }
  }

  onProcess = (e) => {
      for (let _attribute in this.attributes) {
          var attribute = this.attributes[_attribute];
          var val = this.stylesContainer.getStyle(attribute);
          var unitMode = "px";
          if (val.indexOf("%") != -1) {
              unitMode = "%";
          } else if (val.indexOf("em") != -1) {
              unitMode = "em";
          } else if (val.indexOf("pt") != -1) {
              unitMode = "pt";
          }
          if (attribute == "top" || attribute == "bottom" || attribute == "height") {
              var deltaY = e.pageY - this.startY;
              var divY = 1;
              if (unitMode != "px") {
                  var converter = new UnitMode();
                  divY = converter.convert(attribute, divY, "px", unitMode, this.selectedElement.getParent());
              }
              var posY = this.prevY + (deltaY / divY);
              this.stylesContainer.setStyle(attribute, posY + unitMode);
          } else {
              var deltaX = e.pageX - this.startX;
              var divX = 1;
              if (unitMode != "px") {
                  var converter = new UnitMode();
                  divX = converter.convert(attribute, divX, "px", unitMode, this.selectedElement.getParent());
              }
              var posX = this.prevX + (deltaX / divX);
              this.stylesContainer.setStyle(attribute, posX + unitMode);
          };
      }
  }

};
