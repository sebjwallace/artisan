
/// <reference path="StyleToggle.ts"/>
/// <reference path="StyleSlider.ts"/>

class StyleToggleSlider{

  private toggle;
  private slider;
  private storedNumVal;

  constructor(private selectedElement, private stylesContainer, private attribute){
      this.selectedElement.observe(this.update, "newSelectedElement");
      this.stylesContainer.observe(this.update, attribute);
      this.stylesContainer.observe(this.storeNumVal, attribute);
      this.toggle = new StyleToggle(selectedElement, stylesContainer, attribute);
      this.slider = new StyleSlider(selectedElement, stylesContainer, attribute);
      this.storedNumVal = "0px";
      return this.render();
  }

  render(){
      $("#" + this.toggle.getManipId()).ready(() => {
          var $toggle = $("#" + this.toggle.getManipId());
          var $sliderMode = $("#" + this.slider.getManipId() + "-mode");
          $toggle.change(() => {
              var $slider = $("#" + this.slider.getManipId() + "-mode");
              if ($toggle.val() == "unit") {
                  $toggle.hide();
                  $slider.show();
                  $sliderMode.show();
                  this.stylesContainer.setStyle(this.attribute, this.storedNumVal);
              };
          });
      });
      $("#" + this.slider.getManipId() + "-mode").ready(() => {
          var $slider = $("#" + this.slider.getManipId());
          var $sliderMode = $("#" + this.slider.getManipId() + "-mode");
          $sliderMode.change(() => {
              var $toggle = $("#" + this.toggle.getManipId());
              if ($sliderMode.val() == "other") {
                  $slider.hide();
                  $sliderMode.hide();
                  $toggle.show();
              };
          });
      });
      return this.toggle.render() + this.slider.render();
  }

  update = () => {
      let styleVal = this.stylesContainer.getStyle(this.attribute);
      let $slider = $("#" + this.slider.getManipId());
      let $sliderMode = $("#" + this.slider.getManipId() + "-mode");
      let $toggle = $("#" + this.toggle.getManipId());
      if (styleVal == "unit") {
          $toggle.hide();
          $slider.show();
          $sliderMode.show();
          return;
      }
      styleVal = styleVal.replace(/\D/g, '');
      if (styleVal == "") {
          $sliderMode.hide();
          $slider.hide();
          $toggle.show();
      } else {
          $toggle.hide();
          $slider.show();
          $sliderMode.show();
      }
  }

  storeNumVal = () => {
      var val = this.stylesContainer.getStyle(this.attribute);
      var valStrip = val.replace(/\D/g, '');
      if (valStrip != "") {
          this.storedNumVal = val;
      }
  }

}
