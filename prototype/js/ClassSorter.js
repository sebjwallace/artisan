var ClassSorter = (function () {
    function ClassSorter(classManager, selectedElement) {
        var _this = this;
        this.classManager = classManager;
        this.selectedElement = selectedElement;
        this.update = function () {
            var classes = _this.classManager.getClasses();
            var elClasses = _this.selectedElement.getClasses();
            var content = "<option value=''> </option>";
            for (var _part in elClasses) {
                var part = elClasses[_part];
                if (part == "") {
                    continue;
                }
                content += "<option value='" + part + "'>" + part + "</option>";
            }
            $("#" + _this.id + "-elementclasses").html(content);
            $("#" + _this.id + "-classmode").html(content);
            content = "";
            for (var _part in classes) {
                var part = classes[_part];
                if (part == "") {
                    continue;
                }
                content += "<option value='" + part + "'>" + part + "</option>";
            }
            $("#" + _this.id + "-allclasses").html(content);
        };
        this.id = "artisan-class-sorter";
        this.selectedElement.observe(this.update, "newSelectedElement");
        this.selectedElement.observe(this.update, "addClass");
        this.selectedElement.observe(this.update, "removeClass");
        this.classManager.observe(this.update, "createdClass");
        this.classManager.observe(this.update, "removedClass");
        return this;
    }
    ClassSorter.prototype.render = function () {
        var _this = this;
        var content = "Class Mode: <select id='" + this.id + "-classmode'></select>";
        content += "<div id='" + this.id + "'>";
        content += "<select multiple id='" + this.id + "-elementclasses'></select>";
        content += "<div id='artisan-class-sorter-buttons'>" + "<button id='" + this.id + "-addclass'> < </button>" + "<button id='" + this.id + "-removeclass'> > </button></div>";
        content += "<select multiple id='" + this.id + "-allclasses'></select>";
        content += "<input type='text' id='" + this.id + "-field'>" + "<button id='" + this.id + "-createclass'>Add</button>" + "<button id='" + this.id + "-renameclass'>Rename</button>" + "<button id='" + this.id + "-deleteclass'>Delete</button>";
        content += "</div>";
        $("#" + this.id).ready(function () {
            var allClasses = $("#" + _this.id + "-allclasses");
            var elClasses = $("#" + _this.id + "-elementclasses");
            allClasses.ready(function () {
                _this.update();
            });
            $("#" + _this.id + "-addclass").click(function () {
                var selected = allClasses.val();
                for (var _selectedClass in selected) {
                    var selectedClass = selected[_selectedClass];
                    _this.selectedElement.addClass(selectedClass);
                }
            });
            $("#" + _this.id + "-removeclass").click(function () {
                var selected = elClasses.val();
                for (var _selectedClass in selected) {
                    var selectedClass = selected[_selectedClass];
                    _this.selectedElement.removeClass(selectedClass);
                }
            });
            $("#" + _this.id + "-createclass").click(function () {
                var nameField = $("#" + _this.id + "-field");
                var name = nameField.val();
                _this.classManager.newClass(name);
                nameField.val("");
            });
            $("#" + _this.id + "-deleteclass").click(function () {
                var selected = allClasses.val();
                for (var _selectedClass in selected) {
                    var selectedClass = selected[_selectedClass];
                    _this.selectedElement.removeClass(selectedClass);
                    _this.classManager.removeClass(selectedClass);
                }
            });
            var classModeEl = $("#" + _this.id + "-classmode");
            classModeEl.change(function () {
                var val = classModeEl.val();
                if (val != "") {
                    _this.selectedElement.modeSwitch("class");
                    _this.selectedElement.setClass(val);
                }
                else {
                    _this.selectedElement.modeSwitch("id");
                }
            });
        });
        return content;
    };
    return ClassSorter;
}());
