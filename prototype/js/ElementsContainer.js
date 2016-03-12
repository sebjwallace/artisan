var ElementsContainer = (function () {
    function ElementsContainer(selectedElement) {
        this.selectedElement = selectedElement;
        this.target = "body";
        this.id = "artisan-container";
        var code = "<div id=\"" + this.id + "\">\n      <div id=\"element0\" class=\"\">\n        <div id=\"element1\" class=\"\">\n          <p id=\"element2\" class=\"\" contenteditable=\"true\">\n          editable text</p>\n        </div>\n      <div id=\"element3\"></div>\n    </div>\n    </div>";
        $(this.target).append(code);
    }
    ElementsContainer.prototype.appendIntoContainer = function (code) {
        if (this.selectedElement.getMode() != "id") {
            this.selectedElement.modeSwitch("id");
        }
        $("#" + this.id).append(code);
    };
    ElementsContainer.prototype.appendIntoElement = function (code) {
        if (this.selectedElement.getMode() != "id") {
            this.selectedElement.modeSwitch("id");
        }
        if (this.selectedElement.getId()) {
            $("#" + this.selectedElement.getId()).append(code);
        }
        else {
            this.appendIntoContainer(code);
        }
    };
    return ElementsContainer;
}());
//# sourceMappingURL=ElementsContainer.js.map