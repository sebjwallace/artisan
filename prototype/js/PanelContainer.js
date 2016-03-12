var PanelContainer = (function () {
    function PanelContainer(selectedElement) {
        this.selectedElement = selectedElement;
        this.panels = {};
        this.container = "body";
        this.id = "artisan-panel-container";
        this.selectedElement.observe(this.classModeOn, "classModeOn");
        this.selectedElement.observe(this.classModeOff, "classModeOff");
    }
    PanelContainer.prototype.render = function () {
        var content = "<div id='artisan-panel-tabs'>";
        for (var panel in this.panels) {
            var click = '$(".artisan-panel-content").hide();$("#artisan-panel-' + panel + '-content").show();';
            content += "<div id='artisan-panel-" + panel + "-tab' onclick='" + click + "' class='artisan-panel-tab'>" + panel + "</div>";
        }
        content += "</div>";
        content += "<div id='artisan-panel-content'>";
        for (var panel in this.panels) {
            content += "<div id='artisan-panel-" + panel + "-content' class='artisan-panel-content'>" + this.panels[panel] + "</div>";
        }
        content += "</div>";
        var container = "<div id='" + this.id + "'>" + content + "</div>";
        $(this.container).append(container);
        $("#" + this.id).draggable();
    };
    PanelContainer.prototype.addPanel = function (panel) {
        this.panels[panel.name] = panel.content;
    };
    PanelContainer.prototype.classModeOn = function () {
        $("#" + this.id).css("border", "1px solid orange");
    };
    PanelContainer.prototype.classModeOff = function () {
        $("#" + this.id).css("border", "none");
    };
    return PanelContainer;
}());
;
//# sourceMappingURL=PanelContainer.js.map