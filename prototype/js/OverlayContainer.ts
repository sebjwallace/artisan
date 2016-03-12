
class OverlayContainer{

  private overlays = [];
  private container;

  constructor(private selectedElement,private stylesContainer){

    this.selectedElement.observe(this.update, "newSelectedElement");

    stylesContainer.observe(this.update, "top");
    stylesContainer.observe(this.update, "bottom");
    stylesContainer.observe(this.update, "left");
    stylesContainer.observe(this.update, "right");
    stylesContainer.observe(this.update, "height");
    stylesContainer.observe(this.update, "width");
    stylesContainer.observe(this.update, "padding");
    stylesContainer.observe(this.update, "padding-top");
    stylesContainer.observe(this.update, "padding-bottom");
    stylesContainer.observe(this.update, "padding-left");
    stylesContainer.observe(this.update, "padding-right");
    stylesContainer.observe(this.update, "margin");
    stylesContainer.observe(this.update, "margin-top");
    stylesContainer.observe(this.update, "margin-bottom");
    stylesContainer.observe(this.update, "margin-left");
    stylesContainer.observe(this.update, "margin-right");
    stylesContainer.observe(this.update, "position");
    stylesContainer.observe(this.update, "float");
    stylesContainer.observe(this.update, "setContainer");

    this.container = "artisan-overlay-container";
    var style = "position:absolute;pointer-events:none;" + "box-shadow: inset 0px 0px 0px 1px rgba(0,0,0,0.75);" + "box-shadow: 0px 0px 0px 1px rgba(220,220,220,0.75);" + "z-index:1001;";
    var overlayContainer = '    <div id="' + this.container + '" style="' + style + '">    </div>';
    $('body').append(overlayContainer);
  }

  update = () => {
      var offsets = this.selectedElement.getOffsets();
      var dimensions = this.selectedElement.getDimensions();

      $("#" + this.container).css({
          height: dimensions.outerHeight,
          width: dimensions.outerWidth,
          top: offsets.top,
          left: offsets.left,
      });

      for (let overlay in this.overlays) {
          var rendering = this.overlays[overlay].update(this.selectedElement);
      }
  }

  render(){
    for (let overlay in this.overlays) {
        var rendering = this.overlays[overlay].render(this.selectedElement);
        $("#" + this.container).append(rendering);
    }
  }

  addOverlay(newOverlay){
    this.overlays.push(newOverlay);
  }

  getContainer(){
      return this.container;
  }

  appendToContainer(code){
      $('#' + this.container).append(code);
  }

}
