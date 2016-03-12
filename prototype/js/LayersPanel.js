/// <reference path='Panel.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var LayersPanel = (function (_super) {
    __extends(LayersPanel, _super);
    function LayersPanel(selectedElement) {
        var _this = this;
        _super.call(this);
        this.selectedElement = selectedElement;
        this.id = "jstree";
        this.update = function () {
            $('.jstree-clicked').removeClass('jstree-clicked');
            $('#jstree-' + _this.selectedElement.getId() + " .jstree-anchor").addClass('jstree-clicked');
        };
        selectedElement.observe(this.update, "newSelectedElement");
        this.render();
    }
    LayersPanel.prototype.render = function () {
        var _this = this;
        var html = $('#artisan-container').html();
        var htmlJson = html2json(html);
        var getElDetails = function (obj) {
            var details = {};
            var tag = obj['tag'];
            var targetId = obj['attr']['artisan-element'];
            if (targetId) {
                details['data'] = targetId;
            }
            details['text'] = "<span class='artisan-tag-" + tag + "'>" + tag + "</span>";
            if (obj['attr']['id']) {
                details['id'] = "jstree-" + obj['attr']['id'];
                details['text'] += " <span class='artisan-tint'>#" + obj['attr']['id'] + "</span>";
            }
            details['state'] = {
                'opened': true
            };
            if (obj['child']) {
                details['children'] = [];
                for (var i = 0; i < obj['child'].length; i++) {
                    details['children'].push(getElDetails(obj['child'][i]));
                }
            }
            return details;
        };
        var domJson = getElDetails(htmlJson);
        //console.log(htmlJson);
        $('#' + this.id).ready(function () {
            $('#' + _this.id).on('changed.jstree', function (e, data) {
                new ClickableEvent(e, $("[artisan-element='" + data.node.data + "']")[0]);
            }).jstree({
                'core': {
                    'data': domJson,
                    "plugins": ["checkbox", "contextmenu", "dnd", "massload", "search", "sort", "state", "types", "unique", "wholerow", "changed", "conditionalselect"]
                }
            });
        });
        return "<div id='" + this.id + "'></div>";
    };
    LayersPanel.prototype.refresh = function () {
        $('#' + this.id).html('');
        this.render();
    };
    return LayersPanel;
}(Panel));
