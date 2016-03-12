var Overlay = (function () {
    function Overlay() {
        this.attribute = "";
        this.value = "";
        this.color = "";
        this.container = {};
    }
    Overlay.prototype.render = function () {
        return "<div id='artisan-overlay-"
            + this.attribute + "' style='position:absolute;width:100%;height:100%;border-color:"
            + this.color + ";'></div>";
    };
    Overlay.prototype.getValueFromElement = function (el) {
        return el.getValue(this.attribute);
    };
    return Overlay;
}());
;
//# sourceMappingURL=Overlay.js.map