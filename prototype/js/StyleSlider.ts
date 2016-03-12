
/// <reference path="UnitMode.ts"/>

class StyleSlider{

  private id;
  private value;
  private $el;
  private $mode;
  private startX = 0;
  private startY = 0;
  private prevY = 0;
  private prevX = 0;
  private unitMode;

  constructor(private selectedElement, private stylesContainer, private attribute) {
      selectedElement.observe(this.update, "newSelectedElement");
      stylesContainer.observe(this.update, attribute);
      stylesContainer.observe(this.update, "setContainer");
      selectedElement.observe(this.update, "classModeOn");
      selectedElement.observe(this.update, "classModeOff");
      this.id = "artisan-style-slider-" + attribute;
      this.$el = $("#" + this.id);
      this.$mode = $("px");
  }

  getManipId(){
      return this.id;
  }
  onProcess(e) {
      this.stylesContainer.setStyle(this.attribute, e.pageX);
  }

  onStart() {
      var value = this.stylesContainer.getStyle("height");
      console.log('start');
  }

  render() {
      var num = "<button id='" + this.id + "' class='artisan-style-slider-value'>" + parseFloat(this.stylesContainer.getStyle(this.attribute)) + "</button>";
      var mode = "<select id='" + this.id + "-mode' class='artisan-style-slider-mode'>" + "<option value='px'>px</option><option value='%'>%</option>" + "<option value='em'>em</option><option value='em'>em</option>" + "<option value='other'>other...</option>" + "</select>";
      var inputField = "<input id='" + this.id + "-input' type='text'>";
      var code = num + inputField + mode;
      $("#" + this.id).ready(() => {
          this.$el = $("#" + this.id);
          this.$mode = $("#" + this.id + "-mode");
          $("#" + this.id).mousedown((e) => {
              var val = this.stylesContainer.getStyle(this.attribute);
              this.startX = e.pageX;
              this.prevX = parseFloat(val);
              this.unitMode = val.replace(/[0-9]/g, '').replace(/\./g, '').replace(/-/g, '');
              $(document).mousemove((e) => {
                  var divisor = 1;
                  if (this.unitMode == "%") {
                      divisor = 4;
                  }
                  var delta = (e.pageX - this.startX) / divisor;
                  var pos = this.prevX + delta;
                  this.stylesContainer.setStyle(this.attribute, pos + this.unitMode);
              });
              $(document).mouseup((e) => {
                  if (this.startX == e.pageX) {
                      $("#" + this.id).hide();
                      var $input = $("#" + this.id + "-input");
                      $input.show();
                      var style = parseFloat(this.stylesContainer.getStyle(this.attribute));
                      $input.val(style);
                      $input.focus();
                      $input.focusout(() => {
                          $input.toggle();
                          this.$el.toggle();
                      });
                  }
                  $(document).unbind('mousemove').unbind('mouseup');
              });
          });
      });
      $("#" + this.id + "-mode").ready(() => {
          var $this = $("#" + this.id + "-mode");
          $this.change(() => {
              var val = parseInt(this.stylesContainer.getStyle(this.attribute));
              var $parent = this.selectedElement.getParent();
              var unitMode = new UnitMode();
              var convert = unitMode.convert(this.attribute, val, $this.val(), this.getUnitMode(), $parent);
              if(convert){ this.stylesContainer.setStyle(this.attribute, convert + $this.val()); }
              else{ console.log('Trying to convert without enough detail.') }
          });
      });
      $("#" + this.id + "-input").ready(() => {
          var $input = $("#" + this.id + "-input");
          $input.hide();
          $input.keypress((e) => {
              if (e.keyCode == 13) {
                  this.stylesContainer.setStyle(this.attribute, $input.val() + this.getUnitMode());
                  $input.hide();
                  $("#" + this.id).show();
              }
          });
      });
      return code;
  }

  update = () => {
      var styleVal = this.stylesContainer.getStyle(this.attribute);
      this.$el.html(parseFloat(styleVal).toFixed(2));
      this.$mode.val(styleVal.replace(/[0-9]/g, '').replace(/\./g, '').replace(/-/g, ''));
      if (this.stylesContainer.wasStyleDefined() == true) {
          $("#" + this.id).css("border-color", "orange");
      } else {
          $("#" + this.id).css("border-color", "rgba(0,0,0,0.25)");
      }
  }

  getUnitMode() {
      var val = this.stylesContainer.getStyle(this.attribute);
      this.unitMode = val.replace(/[0-9]/g, '').replace(/\./g, '').replace(/-/g, '');
      return this.unitMode;
  }

}
