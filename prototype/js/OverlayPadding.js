/// <reference path="Overlay.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OverlayPadding = (function (_super) {
    __extends(OverlayPadding, _super);
    function OverlayPadding() {
        var _this = this;
        _super.call(this);
        this.update = function (el) {
            var top = el.getValue('padding-top');
            var bottom = el.getValue('padding-bottom');
            var left = el.getValue('padding-left');
            var right = el.getValue('padding-right');
            var styleTop = "box-shadow: inset 0px " + top + " 0px 0px " + _this.color + ";";
            var styleBottom = "box-shadow: inset 0px -" + bottom + " 0px 0px " + _this.color + ";";
            var styleLeft = "box-shadow: inset " + left + " 0px 0px 0px " + _this.color + ";";
            var styleRight = "box-shadow: inset -" + right + " 0px 0px 0px " + _this.color + ";";
            var topPadding = "<div style='position:absolute;width:100%;height:100%;" + styleTop + ";'></div>";
            var bottomPadding = "<div style='position:absolute;width:100%;height:100%;" + styleBottom + ";'></div>";
            var leftPadding = "<div style='position:absolute;width:100%;height:100%;" + styleLeft + ";'></div>";
            var rightPadding = "<div style='position:absolute;width:100%;height:100%;" + styleRight + ";'></div>";
            $("#" + _this.container).html(topPadding + bottomPadding + leftPadding + rightPadding);
        };
        this.attribute = "padding";
        this.color = "rgba(86, 146, 255, 0.5)";
        this.container = "artisan-overlay-" + this.attribute;
    }
    return OverlayPadding;
}(Overlay));
//# sourceMappingURL=OverlayPadding.js.map