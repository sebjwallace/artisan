/// <reference path="UnitMode.ts"/>
var StyleSlider = (function () {
    function StyleSlider(selectedElement, stylesContainer, attribute) {
        var _this = this;
        this.selectedElement = selectedElement;
        this.stylesContainer = stylesContainer;
        this.attribute = attribute;
        this.startX = 0;
        this.startY = 0;
        this.prevY = 0;
        this.prevX = 0;
        this.update = function () {
            var styleVal = _this.stylesContainer.getStyle(_this.attribute);
            _this.$el.html(parseFloat(styleVal).toFixed(2));
            _this.$mode.val(styleVal.replace(/[0-9]/g, '').replace(/\./g, '').replace(/-/g, ''));
            if (_this.stylesContainer.wasStyleDefined() == true) {
                $("#" + _this.id).css("border-color", "orange");
            }
            else {
                $("#" + _this.id).css("border-color", "rgba(0,0,0,0.25)");
            }
        };
        selectedElement.observe(this.update, "newSelectedElement");
        stylesContainer.observe(this.update, attribute);
        stylesContainer.observe(this.update, "setContainer");
        selectedElement.observe(this.update, "classModeOn");
        selectedElement.observe(this.update, "classModeOff");
        this.id = "artisan-style-slider-" + attribute;
        this.$el = $("#" + this.id);
        this.$mode = $("px");
    }
    StyleSlider.prototype.getManipId = function () {
        return this.id;
    };
    StyleSlider.prototype.onProcess = function (e) {
        this.stylesContainer.setStyle(this.attribute, e.pageX);
    };
    StyleSlider.prototype.onStart = function () {
        var value = this.stylesContainer.getStyle("height");
        console.log('start');
    };
    StyleSlider.prototype.render = function () {
        var _this = this;
        var num = "<button id='" + this.id + "' class='artisan-style-slider-value'>" + parseFloat(this.stylesContainer.getStyle(this.attribute)) + "</button>";
        var mode = "<select id='" + this.id + "-mode' class='artisan-style-slider-mode'>" + "<option value='px'>px</option><option value='%'>%</option>" + "<option value='em'>em</option><option value='em'>em</option>" + "<option value='other'>other...</option>" + "</select>";
        var inputField = "<input id='" + this.id + "-input' type='text'>";
        var code = num + inputField + mode;
        $("#" + this.id).ready(function () {
            _this.$el = $("#" + _this.id);
            _this.$mode = $("#" + _this.id + "-mode");
            $("#" + _this.id).mousedown(function (e) {
                var val = _this.stylesContainer.getStyle(_this.attribute);
                _this.startX = e.pageX;
                _this.prevX = parseFloat(val);
                _this.unitMode = val.replace(/[0-9]/g, '').replace(/\./g, '').replace(/-/g, '');
                $(document).mousemove(function (e) {
                    var divisor = 1;
                    if (_this.unitMode == "%") {
                        divisor = 4;
                    }
                    var delta = (e.pageX - _this.startX) / divisor;
                    var pos = _this.prevX + delta;
                    _this.stylesContainer.setStyle(_this.attribute, pos + _this.unitMode);
                });
                $(document).mouseup(function (e) {
                    if (_this.startX == e.pageX) {
                        $("#" + _this.id).hide();
                        var $input = $("#" + _this.id + "-input");
                        $input.show();
                        var style = parseFloat(_this.stylesContainer.getStyle(_this.attribute));
                        $input.val(style);
                        $input.focus();
                        $input.focusout(function () {
                            $input.toggle();
                            _this.$el.toggle();
                        });
                    }
                    $(document).unbind('mousemove').unbind('mouseup');
                });
            });
        });
        $("#" + this.id + "-mode").ready(function () {
            var $this = $("#" + _this.id + "-mode");
            $this.change(function () {
                var val = parseInt(_this.stylesContainer.getStyle(_this.attribute));
                var $parent = _this.selectedElement.getParent();
                var unitMode = new UnitMode();
                var convert = unitMode.convert(_this.attribute, val, $this.val(), _this.getUnitMode(), $parent);
                if (convert) {
                    _this.stylesContainer.setStyle(_this.attribute, convert + $this.val());
                }
                else {
                    console.log('Trying to convert without enough detail.');
                }
            });
        });
        $("#" + this.id + "-input").ready(function () {
            var $input = $("#" + _this.id + "-input");
            $input.hide();
            $input.keypress(function (e) {
                if (e.keyCode == 13) {
                    _this.stylesContainer.setStyle(_this.attribute, $input.val() + _this.getUnitMode());
                    $input.hide();
                    $("#" + _this.id).show();
                }
            });
        });
        return code;
    };
    StyleSlider.prototype.getUnitMode = function () {
        var val = this.stylesContainer.getStyle(this.attribute);
        this.unitMode = val.replace(/[0-9]/g, '').replace(/\./g, '').replace(/-/g, '');
        return this.unitMode;
    };
    return StyleSlider;
}());
