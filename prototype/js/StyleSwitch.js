var StyleSwitch = (function () {
    function StyleSwitch(attribute, values, stylesContainer, selectedElement) {
        var _this = this;
        this.attribute = attribute;
        this.values = values;
        this.stylesContainer = stylesContainer;
        this.selectedElement = selectedElement;
        this.update = function () {
            var activeStyle = _this.stylesContainer.getStyle(_this.attribute);
            $('.artisan-style-switch-' + _this.attribute).fadeTo("fast", 1);
            $('#artisan-style-switch-' + _this.attribute + '-' + activeStyle).fadeTo("fast", 0.5);
        };
        this.stylesContainer.observe(this.update, this.attribute);
        selectedElement.observe(this.update, "newSelectedElement");
    }
    StyleSwitch.prototype.render = function () {
        var content = "<div class='artisan-style-switch'>";
        for (var _value in this.values) {
            var value = this.values[_value];
            var click = 'GET("stylesContainer").setStyle("' + this.attribute + '","' + value + '");';
            content += "<button onclick='" + click + "' id='artisan-style-switch-"
                + this.attribute + "-" + value + "' class='artisan-style-switch-"
                + this.attribute + "' >" + value + "</button>";
        }
        content += "</div>";
        return content;
    };
    return StyleSwitch;
}());
