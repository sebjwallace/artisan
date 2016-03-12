/// <reference path="Observable.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SelectedElement = (function (_super) {
    __extends(SelectedElement, _super);
    function SelectedElement() {
        _super.apply(this, arguments);
        this.selectedElement = {};
        this.mode = "id";
        this.selectedClass = "";
    }
    SelectedElement.prototype.setSelectedElement = function (newSelectedElement) {
        if (!$(this.selectedElement).is(newSelectedElement)) {
            this.selectedElement = newSelectedElement;
            this.update("newSelectedElement");
            return true;
        }
        else {
            return false;
        }
    };
    SelectedElement.prototype.getValue = function (attribute, asNumber) {
        var value = $("#" + $(this.selectedElement).attr('id')).css(attribute);
        if (asNumber) {
            return parseFloat(value);
        }
        else {
            return value;
        }
    };
    SelectedElement.prototype.getOffsets = function () {
        return $(this.selectedElement).offset();
    };
    SelectedElement.prototype.getDimensions = function () {
        var dimensions = {};
        var el = $(this.selectedElement);
        dimensions['height'] = el.css("height");
        dimensions['width'] = el.css("width");
        dimensions['outerHeight'] = el.outerHeight();
        dimensions['outerWidth'] = el.outerWidth();
        return dimensions;
    };
    SelectedElement.prototype.getId = function () {
        if (this.mode == "class") {
            return this.selectedClass;
        }
        else {
            return $(this.selectedElement).attr('id');
        }
    };
    SelectedElement.prototype.getParent = function () {
        return $(this.selectedElement).parent();
    };
    SelectedElement.prototype.modeSwitch = function (mode) {
        if (mode == "id" || mode == "class") {
            this.mode = mode;
            if (mode == "class") {
                this.update("classModeOn");
            }
            else {
                this.update("classModeOff");
            }
            ;
        }
        else {
            return false;
        }
    };
    SelectedElement.prototype.setClass = function (name) {
        if (name.indexOf(".") != -1) {
            name = name.replace(".", "");
        }
        this.selectedClass = name;
        this.modeSwitch("class");
    };
    SelectedElement.prototype.addClass = function (name) {
        name = name.replace(".", "");
        $(this.selectedElement).addClass(name);
        this.update("addClass");
    };
    SelectedElement.prototype.changeId = function (name) {
        var oldName = $(this.selectedElement).attr('id');
        if (!oldName) {
            return false;
        }
        $(this.selectedElement).attr('id', name);
        this.update("newIdName", oldName, name);
    };
    SelectedElement.prototype.getClasses = function () {
        var classes = $(this.selectedElement).attr('class');
        if (classes) {
            return classes.split(" ");
        }
    };
    SelectedElement.prototype.removeClass = function (name) {
        if (name.indexOf(".") != -1) {
            name = name.replace(".", "");
        }
        $(this.selectedElement).removeClass(name);
        this.update("removeClass");
    };
    SelectedElement.prototype.getMode = function () {
        return this.mode;
    };
    return SelectedElement;
}(Observable));
//# sourceMappingURL=SelectedElement.js.map