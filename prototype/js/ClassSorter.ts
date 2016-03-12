
class ClassSorter{

  private id;

  constructor(private classManager, private selectedElement) {
      this.id = "artisan-class-sorter";
      this.selectedElement.observe(this.update, "newSelectedElement");
      this.selectedElement.observe(this.update, "addClass");
      this.selectedElement.observe(this.update, "removeClass");
      this.classManager.observe(this.update, "createdClass");
      this.classManager.observe(this.update, "removedClass");
      return this;
  }

  render() {
      var content = "Class Mode: <select id='" + this.id + "-classmode'></select>";
      content += "<div id='" + this.id + "'>";
      content += "<select multiple id='" + this.id + "-elementclasses'></select>";
      content += "<div id='artisan-class-sorter-buttons'>" + "<button id='" + this.id + "-addclass'> < </button>" + "<button id='" + this.id + "-removeclass'> > </button></div>";
      content += "<select multiple id='" + this.id + "-allclasses'></select>";
      content += "<input type='text' id='" + this.id + "-field'>" + "<button id='" + this.id + "-createclass'>Add</button>" + "<button id='" + this.id + "-renameclass'>Rename</button>" + "<button id='" + this.id + "-deleteclass'>Delete</button>";
      content += "</div>";
      $("#" + this.id).ready(() => {
          var allClasses = $("#" + this.id + "-allclasses");
          var elClasses = $("#" + this.id + "-elementclasses");
          allClasses.ready(() => {
              this.update();
          });
          $("#" + this.id + "-addclass").click(() => {
              var selected = allClasses.val();
              for (let _selectedClass in selected) {
                  var selectedClass = selected[_selectedClass];
                  this.selectedElement.addClass(selectedClass);
              }
          });
          $("#" + this.id + "-removeclass").click(() => {
              var selected = elClasses.val();
              for (let _selectedClass in selected) {
                  var selectedClass = selected[_selectedClass];
                  this.selectedElement.removeClass(selectedClass);
              }
          });
          $("#" + this.id + "-createclass").click(() => {
              var nameField = $("#" + this.id + "-field");
              var name = nameField.val();
              this.classManager.newClass(name);
              nameField.val("");
          });
          $("#" + this.id + "-deleteclass").click(() => {
              var selected = allClasses.val();
              for (let _selectedClass in selected) {
                  var selectedClass = selected[_selectedClass];
                  this.selectedElement.removeClass(selectedClass);
                  this.classManager.removeClass(selectedClass);
              }
          });
          var classModeEl = $("#" + this.id + "-classmode");
          classModeEl.change(() => {
              var val = classModeEl.val();
              if (val != "") {
                  this.selectedElement.modeSwitch("class");
                  this.selectedElement.setClass(val);
              } else {
                  this.selectedElement.modeSwitch("id");
              }
          });
      });
      return content;
  }

  update = () => {
      var classes = this.classManager.getClasses();
      var elClasses = this.selectedElement.getClasses();
      var content = "<option value=''> </option>";
      for (let _part in elClasses) {
          var part = elClasses[_part];
          if (part == "") {
              continue;
          }
          content += "<option value='" + part + "'>" + part + "</option>";
      }
      $("#" + this.id + "-elementclasses").html(content);
      $("#" + this.id + "-classmode").html(content);
      content = "";
      for (let _part in classes) {
          var part = classes[_part];
          if (part == "") {
              continue;
          }
          content += "<option value='" + part + "'>" + part + "</option>";
      }
      $("#" + this.id + "-allclasses").html(content);
  }

}
