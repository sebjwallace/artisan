var OverlayContainer = (function () {
    function OverlayContainer(selectedElement, stylesContainer) {
        var _this = this;
        this.selectedElement = selectedElement;
        this.stylesContainer = stylesContainer;
        this.overlays = [];
        this.update = function () {
            var offsets = _this.selectedElement.getOffsets();
            var dimensions = _this.selectedElement.getDimensions();
            $("#" + _this.container).css({
                height: dimensions.outerHeight,
                width: dimensions.outerWidth,
                top: offsets.top,
                left: offsets.left,
            });
            for (var overlay in _this.overlays) {
                var rendering = _this.overlays[overlay].update(_this.selectedElement);
            }
        };
        this.selectedElement.observe(this.update, "newSelectedElement");
        stylesContainer.observe(this.update, "top");
        stylesContainer.observe(this.update, "bottom");
        stylesContainer.observe(this.update, "left");
        stylesContainer.observe(this.update, "right");
        stylesContainer.observe(this.update, "height");
        stylesContainer.observe(this.update, "width");
        stylesContainer.observe(this.update, "padding");
        stylesContainer.observe(this.update, "padding-top");
        stylesContainer.observe(this.update, "padding-bottom");
        stylesContainer.observe(this.update, "padding-left");
        stylesContainer.observe(this.update, "padding-right");
        stylesContainer.observe(this.update, "margin");
        stylesContainer.observe(this.update, "margin-top");
        stylesContainer.observe(this.update, "margin-bottom");
        stylesContainer.observe(this.update, "margin-left");
        stylesContainer.observe(this.update, "margin-right");
        stylesContainer.observe(this.update, "position");
        stylesContainer.observe(this.update, "float");
        stylesContainer.observe(this.update, "setContainer");
        this.container = "artisan-overlay-container";
        var style = "position:absolute;pointer-events:none;" + "box-shadow: inset 0px 0px 0px 1px rgba(0,0,0,0.75);" + "box-shadow: 0px 0px 0px 1px rgba(220,220,220,0.75);" + "z-index:1001;";
        var overlayContainer = '    <div id="' + this.container + '" style="' + style + '">    </div>';
        $('body').append(overlayContainer);
    }
    OverlayContainer.prototype.render = function () {
        for (var overlay in this.overlays) {
            var rendering = this.overlays[overlay].render(this.selectedElement);
            $("#" + this.container).append(rendering);
        }
    };
    OverlayContainer.prototype.addOverlay = function (newOverlay) {
        this.overlays.push(newOverlay);
    };
    OverlayContainer.prototype.getContainer = function () {
        return this.container;
    };
    OverlayContainer.prototype.appendToContainer = function (code) {
        $('#' + this.container).append(code);
    };
    return OverlayContainer;
}());
//# sourceMappingURL=OverlayContainer.js.map