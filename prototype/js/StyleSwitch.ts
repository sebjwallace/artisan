class StyleSwitch{

  constructor(private attribute, private values, private stylesContainer, private selectedElement) {
      this.stylesContainer.observe(this.update, this.attribute);
      selectedElement.observe(this.update, "newSelectedElement");

  }

  render(){
      var content = "<div class='artisan-style-switch'>";
      for (let _value in this.values) {
          var value = this.values[_value];
          var click = 'GET("stylesContainer").setStyle("' + this.attribute + '","' + value + '");';
          content += "<button onclick='" + click + "' id='artisan-style-switch-"
          + this.attribute + "-" + value + "' class='artisan-style-switch-"
          + this.attribute + "' >" + value + "</button>";
      }
      content += "</div>";
      return content;
  }

  update = () => {
      var activeStyle = this.stylesContainer.getStyle(this.attribute);
      $('.artisan-style-switch-' + this.attribute).fadeTo("fast", 1);
      $('#artisan-style-switch-' + this.attribute + '-' + activeStyle).fadeTo("fast", 0.5);
  }

}
