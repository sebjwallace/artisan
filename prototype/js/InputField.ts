class InputField{

  private id;

  constructor(private selectedElement) {
      this.id = "artisan-inputfield-id";
      selectedElement.observe(this.update, "newSelectedElement");
  }

  render() {
      var code = "<div>Id <input type='text' id='" + this.id + "'></div>";
      $("#" + this.id).ready(function() {
          $("#" + this.id).keypress(function(e) {
              if (e.keyCode == 13) {
                  this.selectedElement.changeId($("#" + this.id).val());
                  $("#" + this.id).blur();
              };
          });
      });
      return code;
  }

  update() {
      $("#" + this.id).val(this.selectedElement.getId());
  }

}
