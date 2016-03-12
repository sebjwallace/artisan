class PanelContainer{

  private panels = {};
  private container = "body";
  private id = "artisan-panel-container";

  constructor(private selectedElement) {
      this.selectedElement.observe(this.classModeOn, "classModeOn");
      this.selectedElement.observe(this.classModeOff, "classModeOff");
  }

  render(){
      var content = "<div id='artisan-panel-tabs'>";
      for (let panel in this.panels) {
          var click = '$(".artisan-panel-content").hide();$("#artisan-panel-' + panel + '-content").show();';
          content += "<div id='artisan-panel-" + panel + "-tab' onclick='" + click + "' class='artisan-panel-tab'>" + panel + "</div>";
      }
      content += "</div>";
      content += "<div id='artisan-panel-content'>";
      for (let panel in this.panels) {
          content += "<div id='artisan-panel-" + panel + "-content' class='artisan-panel-content'>" + this.panels[panel] + "</div>";
      }
      content += "</div>";
      var container = "<div id='" + this.id + "'>" + content + "</div>";
      $(this.container).append(container);
      $("#" + this.id).draggable();
  }

  addPanel(panel) {
      this.panels[panel.name] = panel.content;
  }

  classModeOn(){
      $("#" + this.id).css("border", "1px solid orange");
  }

  classModeOff(){
      $("#" + this.id).css("border", "none");
  }

};
