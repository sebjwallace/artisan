/// <reference path="Panel.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StylesPanel = (function (_super) {
    __extends(StylesPanel, _super);
    function StylesPanel() {
        _super.apply(this, arguments);
    }
    StylesPanel.prototype.renderBlock = function (items) {
        var code = "<div class='col-half'>";
        var counter = 0;
        for (var item in items) {
            if (counter == 2) {
                code += "</div><div class='col-half'>";
                counter = 0;
            }
            code += items[item] + "<br>";
            code += GET('StyleToggleSlider', items[item]).render() + "<br>";
            counter++;
        }
        code += "</div>";
        return code;
    };
    StylesPanel.prototype.render = function () {
        var display = GET("StyleToggle", "display").render();
        var position = GET("StyleToggle", "position").render();
        var float = GET('StyleSwitch', 'float', ['left', 'center', 'right']);
        var floatSwitches = float.render();
        var dimensions = "";
        dimensions += "height" + GET('StyleToggleSlider', "height").render();
        dimensions += "width" + GET('StyleToggleSlider', "width").render();
        var paddingMargin = "";
        paddingMargin += "padding" + GET('StyleToggleSlider', "padding").render();
        paddingMargin += "margin" + GET('StyleToggleSlider', "margin").render();
        var positions = this.renderBlock(['top', 'bottom', 'left', 'right']);
        var paddings = this.renderBlock(['padding-top', 'padding-bottom', 'padding-left', 'padding-right']);
        var margins = this.renderBlock(['margin-top', 'margin-bottom', 'margin-left', 'margin-right']);
        var font = this.renderBlock(['font-size', 'letter-spacing', 'line-height']);
        var textAlign = GET('StyleSwitch', 'text-align', ['left', 'center', 'right']);
        font += textAlign.render();
        var background = this.renderBlock(['background-size', 'background-position-x', 'background-position-y']);
        var inputStyle = "width:100px;background-color: rgb(70,70,70);";
        var backgroundFileButton = GET('FilePicker', 'background-image');
        var backgroundFile = backgroundFileButton.render();
        var backgroundColorPicker = GET('ColorPicker', 'background-color');
        var backgroundColor = backgroundColorPicker.render();
        var fontColorPicker = GET('ColorPicker', 'color');
        var fontColor = fontColorPicker.render();
        var separator = "<div style='width:100%;height:1px;margin:5px;clear:both;background:rgba(255,255,255,0.1);'></div>";
        var content = position + display + floatSwitches + separator + dimensions + separator + positions + separator + paddingMargin + separator + paddings + separator + margins + separator + font + separator + background + backgroundFile + separator + backgroundColor + fontColor;
        return content;
    };
    return StylesPanel;
}(Panel));
