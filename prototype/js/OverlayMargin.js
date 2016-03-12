/// <reference path="Overlay.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OverlayMargin = (function (_super) {
    __extends(OverlayMargin, _super);
    function OverlayMargin() {
        var _this = this;
        _super.call(this);
        this.update = function (selectedElement) {
            selectedElement;
            var top = selectedElement.getValue('margin-top');
            var bottom = selectedElement.getValue('margin-bottom');
            var left = selectedElement.getValue('margin-left');
            var right = selectedElement.getValue('margin-right');
            var borderTop = "border-top-width:" + top + ";";
            var borderBottom = "border-bottom-width:" + bottom + ";";
            var borderLeft = "border-left-width:" + left + ";";
            var borderRight = "border-right-width:" + right + ";";
            var style = "position:absolute;width:100%;height:100%;border:1px solid " + _this.color + ";" + borderTop + borderBottom + borderLeft + borderRight + "top:-" + top + ";left:-" + left + ";";
            var margin = "<div style='" + style + "'></div>";
            $("#" + _this.container).html(margin);
        };
        this.attribute = "margin";
        this.value = "";
        this.color = "rgba(255, 195, 80, 0.5);";
        this.container = "artisan-overlay-" + this.attribute;
    }
    return OverlayMargin;
}(Overlay));
//# sourceMappingURL=OverlayMargin.js.map