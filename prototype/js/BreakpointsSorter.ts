class BreakpointsSorter{

  private id;

  constructor(private breakpointsManager, private overlayContainer) {
      this.id = "artisan-breakpoints-sorter";
      this.breakpointsManager.observe(this.update, "newBreakpoint");
  }

  render(){
      var content = "";
      content += "<div id='" + this.id + "-slider'></div>" + "<input id='" + this.id + "-field' type='text'>" + "<button id='" + this.id + "-add'>+</button>" + "<button id='" + this.id + "-remove'>-</button>";
      content += "<select id='" + this.id + "'></select>";
      this.events();
      return content;
  }

  update = () => {
      var container = $("#" + this.id);
      var bpts = this.breakpointsManager.getBreakpoints();
      var content = "";
      for (let bpt in bpts) {
          content += "<option value='" + bpts[bpt].max + "'>" + bpts[bpt].max + "</option>";
      }
      container.html(content);
  }

  change(val) {
      val;
      $("#artisan-container").width(val); //$>* css:change width of container;
      this.overlayContainer.update();
      this.breakpointsManager.toggleBreakpoints(val);
  }

  events(){
      $("#" + this.id).ready(() => {
          this.update();
          $("#" + this.id + "-add").click(() => { //$> click:add button;
              var title = $("#" + this.id + "-field").val();
              this.breakpointsManager.addBreakpoint(title);
          });
          $("#" + this.id + "-slider").slider({
              range: true,
              min: 0,
              max: 1200,
              step: 10,
              values: [0, 1200],
              slide: (event, ui) => {
                  $("#" + this.id + "-field").val(ui.values[0] + " > " + ui.values[1]);
                  this.change(ui.values[1]);
              },
              change: (event, ui) => {
                  $("#" + this.id + "-field").val(ui.values[0] + " > " + ui.values[1]);
                  this.change(ui.values[1]);
              },
          });
          $('#' + this.id).change(function(e) { //$> change:change breakpoint;
              var values = $('#' + this.id).val().split(" > ");
              var $slider = $('#' + this.id + "-slider");
              $slider.slider("values", 1, values[1]);
          });
      });
  }

}
