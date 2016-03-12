/// <reference path="UnitMode.ts"/>
var OverlayManipulator = (function () {
    function OverlayManipulator(attributes, buttonPosition, stylesContainer, overlayContainer, selectedElement) {
        var _this = this;
        this.attributes = attributes;
        this.stylesContainer = stylesContainer;
        this.overlayContainer = overlayContainer;
        this.selectedElement = selectedElement;
        this.render = function (overlayContainer) {
            var attributes = "";
            for (var attribute in _this.attributes) {
                attributes += "-" + _this.attributes[attribute];
            }
            var id = "artisan-overlay-controller" + attributes;
            var code = "<div id='" + id + "' class='artisan-overlay-controller' style='" + _this.style + "'></div>";
            overlayContainer.appendToContainer(code);
            $("#" + id).mousedown(function (event) {
                _this.onStart(event);
                $(document).mousemove(function (event) {
                    _this.onProcess(event);
                });
                $(document).mouseup(function (event) {
                    //this.onEnd(event);
                    $(document).unbind("mousemove");
                    $(document).unbind("mouseup");
                });
            });
        };
        this.onStart = function (e) {
            _this.startX = e.pageX;
            _this.startY = e.pageY;
            for (var _attribute in _this.attributes) {
                var attribute = _this.attributes[_attribute];
                if (attribute == "top" || attribute == "bottom" || attribute == "height") {
                    var prevY = parseFloat(_this.stylesContainer.getStyle(attribute));
                    if (isNaN(prevY)) {
                        prevY = 0;
                    }
                    _this.prevY = prevY;
                }
                else {
                    var prevX = parseFloat(_this.stylesContainer.getStyle(attribute));
                    if (isNaN(prevX)) {
                        prevX = 0;
                    }
                    _this.prevX = prevX;
                }
                ;
            }
        };
        this.onProcess = function (e) {
            for (var _attribute in _this.attributes) {
                var attribute = _this.attributes[_attribute];
                var val = _this.stylesContainer.getStyle(attribute);
                var unitMode = "px";
                if (val.indexOf("%") != -1) {
                    unitMode = "%";
                }
                else if (val.indexOf("em") != -1) {
                    unitMode = "em";
                }
                else if (val.indexOf("pt") != -1) {
                    unitMode = "pt";
                }
                if (attribute == "top" || attribute == "bottom" || attribute == "height") {
                    var deltaY = e.pageY - _this.startY;
                    var divY = 1;
                    if (unitMode != "px") {
                        var converter = new UnitMode();
                        divY = converter.convert(attribute, divY, "px", unitMode, _this.selectedElement.getParent());
                    }
                    var posY = _this.prevY + (deltaY / divY);
                    _this.stylesContainer.setStyle(attribute, posY + unitMode);
                }
                else {
                    var deltaX = e.pageX - _this.startX;
                    var divX = 1;
                    if (unitMode != "px") {
                        var converter = new UnitMode();
                        divX = converter.convert(attribute, divX, "px", unitMode, _this.selectedElement.getParent());
                    }
                    var posX = _this.prevX + (deltaX / divX);
                    _this.stylesContainer.setStyle(attribute, posX + unitMode);
                }
                ;
            }
        };
        if (buttonPosition == "top-left") {
            this.style = "top:-5px;left:-5px";
        }
        else if (buttonPosition == "top") {
            this.style = "top:-5px;left:50%";
        }
        else if (buttonPosition == "top-right") {
            this.style = "top:-5px;right:-5px";
        }
        else if (buttonPosition == "right") {
            this.style = "top:50%;right:-5px;";
        }
        else if (buttonPosition == "bottom-right") {
            this.style = "bottom:-5px;right:-5px;";
        }
        else if (buttonPosition == "bottom") {
            this.style = "bottom:-5px;left:50%;";
        }
        else if (buttonPosition == "bottom-left") {
            this.style = "bottom:-5px;left:-5px;";
        }
        else if (buttonPosition == "left") {
            this.style = "top:50%;left:-5px;";
        }
        this.render(overlayContainer);
        this.startX = 0;
        this.startY = 0;
    }
    OverlayManipulator.prototype.getManipId = function () {
        return this.id;
    };
    OverlayManipulator.prototype.onEnd = function () {
        //console.log('complete');
    };
    return OverlayManipulator;
}());
;
