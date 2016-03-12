/// <reference path="Observable.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var StylesContainer = (function (_super) {
    __extends(StylesContainer, _super);
    function StylesContainer(selectedElement) {
        _super.call(this);
        this.selectedElement = selectedElement;
        this.target = "body";
        this.id = "artisan-styles-container";
        this.lastStyleDefined = false;
        this.selectedElement.observe(this.updateIdName, "newIdName");
        var code = '<style id="' + this.id + '" artisan-breakpoint="0 > 1200" artisan-breakpoint-max="1200"></style>';
        $(this.target).append(code);
        this.container = $("#" + this.id);
    }
    StylesContainer.prototype.getStyle = function (attribute) {
        var id = this.selectedElement.getId();
        var code = this.container.html();
        var idIndex = code.indexOf(id);
        var endIndex = code.indexOf("}", idIndex);
        var sample = code.substring(0, endIndex);
        var attrIndex = sample.indexOf(";" + attribute + ":", idIndex);
        var closeIndex = sample.indexOf(";", attrIndex + attribute.length); // attrIndex + 1 for the : before
        var result = code.substring(attrIndex + 1 + attribute.length + 1, closeIndex);
        this.lastStyleDefined = true;
        if (attrIndex == -1) {
            result = this.selectedElement.getValue(attribute);
            this.lastStyleDefined = false;
        }
        return result;
    };
    StylesContainer.prototype.setStyle = function (attribute, style) {
        if (style.indexOf(" px") != -1 || style.indexOf(" %") != -1 || style.indexOf(" em") != -1) {
            style = style.substring(0, style.indexOf(" "));
        }
        var id = this.selectedElement.getId();
        var code = this.container.html();
        var idIndex = code.indexOf(id);
        if (idIndex == -1) {
            if (this.selectedElement.getMode() == "id") {
                code += "#" + id + "{}";
            }
            else {
                code += "." + id + "{}";
            }
            idIndex = code.indexOf(id);
        }
        var endIndex = code.indexOf("}", idIndex);
        var sample = code.substring(0, endIndex);
        var attrIndex = sample.indexOf(";" + attribute + ":", idIndex);
        var closeIndex = sample.indexOf(";", attrIndex + attribute.length);
        if (attrIndex == -1) {
            closeIndex = code.indexOf("}", idIndex);
            code = code.substring(0, closeIndex) + attribute + ":" + style + ";" + code.substring(closeIndex);
        }
        else {
            code = code.substring(0, attrIndex + attribute.length + 2) + style + code.substring(closeIndex);
        }
        this.container.html(code);
        this.update(attribute);
    };
    StylesContainer.prototype.updateIdName = function (currentId, newId) {
        var code = this.container.html();
        code = code.replace("#" + currentId, "#" + newId);
        this.container.html(code);
    };
    StylesContainer.prototype.wasStyleDefined = function () {
        return this.lastStyleDefined;
    };
    StylesContainer.prototype.setContainer = function ($newContainer) {
        this.container = $newContainer;
        this.update("setContainer");
    };
    return StylesContainer;
}(Observable));
