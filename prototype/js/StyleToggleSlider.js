/// <reference path="StyleToggle.ts"/>
/// <reference path="StyleSlider.ts"/>
var StyleToggleSlider = (function () {
    function StyleToggleSlider(selectedElement, stylesContainer, attribute) {
        var _this = this;
        this.selectedElement = selectedElement;
        this.stylesContainer = stylesContainer;
        this.attribute = attribute;
        this.update = function () {
            var styleVal = _this.stylesContainer.getStyle(_this.attribute);
            var $slider = $("#" + _this.slider.getManipId());
            var $sliderMode = $("#" + _this.slider.getManipId() + "-mode");
            var $toggle = $("#" + _this.toggle.getManipId());
            if (styleVal == "unit") {
                $toggle.hide();
                $slider.show();
                $sliderMode.show();
                return;
            }
            styleVal = styleVal.replace(/\D/g, '');
            if (styleVal == "") {
                $sliderMode.hide();
                $slider.hide();
                $toggle.show();
            }
            else {
                $toggle.hide();
                $slider.show();
                $sliderMode.show();
            }
        };
        this.storeNumVal = function () {
            var val = _this.stylesContainer.getStyle(_this.attribute);
            var valStrip = val.replace(/\D/g, '');
            if (valStrip != "") {
                _this.storedNumVal = val;
            }
        };
        this.selectedElement.observe(this.update, "newSelectedElement");
        this.stylesContainer.observe(this.update, attribute);
        this.stylesContainer.observe(this.storeNumVal, attribute);
        this.toggle = new StyleToggle(selectedElement, stylesContainer, attribute);
        this.slider = new StyleSlider(selectedElement, stylesContainer, attribute);
        this.storedNumVal = "0px";
        return this.render();
    }
    StyleToggleSlider.prototype.render = function () {
        var _this = this;
        $("#" + this.toggle.getManipId()).ready(function () {
            var $toggle = $("#" + _this.toggle.getManipId());
            var $sliderMode = $("#" + _this.slider.getManipId() + "-mode");
            $toggle.change(function () {
                var $slider = $("#" + _this.slider.getManipId() + "-mode");
                if ($toggle.val() == "unit") {
                    $toggle.hide();
                    $slider.show();
                    $sliderMode.show();
                    _this.stylesContainer.setStyle(_this.attribute, _this.storedNumVal);
                }
                ;
            });
        });
        $("#" + this.slider.getManipId() + "-mode").ready(function () {
            var $slider = $("#" + _this.slider.getManipId());
            var $sliderMode = $("#" + _this.slider.getManipId() + "-mode");
            $sliderMode.change(function () {
                var $toggle = $("#" + _this.toggle.getManipId());
                if ($sliderMode.val() == "other") {
                    $slider.hide();
                    $sliderMode.hide();
                    $toggle.show();
                }
                ;
            });
        });
        return this.toggle.render() + this.slider.render();
    };
    return StyleToggleSlider;
}());
