
class ColorPicker{

  private id;

  constructor(private attribute, private stylesContainer, private selectedElement) {
      this.id = "artisan-colorpicker-" + this.attribute;
      selectedElement.observe(this.update, "newSelectedElement");
  }

  render() {
      let content = "<div class='artisan-colorpicker'>" + this.attribute + " <input id='" + this.id + "' type='text'/></div>";
      $("#" + this.id).ready(() => {
          $("#" + this.id).spectrum({
              move:(color) => {
                  this.stylesContainer.setStyle(this.attribute, color.toRgbString());
              },
              showAlpha: true,
              clickoutFiresChange: true,
          });
      });
      return content;
  }

  update = () => {
      let attribute = this.stylesContainer.getStyle(this.attribute);
      $("#" + this.id).spectrum("set", attribute);
  }

};
