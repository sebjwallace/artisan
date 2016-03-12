var ColorPicker = (function () {
    function ColorPicker(attribute, stylesContainer, selectedElement) {
        var _this = this;
        this.attribute = attribute;
        this.stylesContainer = stylesContainer;
        this.selectedElement = selectedElement;
        this.update = function () {
            var attribute = _this.stylesContainer.getStyle(_this.attribute);
            $("#" + _this.id).spectrum("set", attribute);
        };
        this.id = "artisan-colorpicker-" + this.attribute;
        selectedElement.observe(this.update, "newSelectedElement");
    }
    ColorPicker.prototype.render = function () {
        var _this = this;
        var content = "<div class='artisan-colorpicker'>" + this.attribute + " <input id='" + this.id + "' type='text'/></div>";
        $("#" + this.id).ready(function () {
            $("#" + _this.id).spectrum({
                move: function (color) {
                    _this.stylesContainer.setStyle(_this.attribute, color.toRgbString());
                },
                showAlpha: true,
                clickoutFiresChange: true,
            });
        });
        return content;
    };
    return ColorPicker;
}());
;
