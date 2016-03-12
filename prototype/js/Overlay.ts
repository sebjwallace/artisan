
abstract class Overlay{

  protected attribute = "";
  protected value = "";
  protected color = "";
  protected container = {};

  render(){
      return "<div id='artisan-overlay-"
      + this.attribute + "' style='position:absolute;width:100%;height:100%;border-color:"
      + this.color + ";'></div>";
  }

  getValueFromElement(el){
      return el.getValue(this.attribute);
  }

};
