/// <reference path='Panel.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SheetsPanel = (function (_super) {
    __extends(SheetsPanel, _super);
    function SheetsPanel() {
        _super.apply(this, arguments);
    }
    SheetsPanel.prototype.render = function () {
        var content = "";
        var classSorter = GET('ClassSorter');
        content += classSorter.render();
        classSorter.update();
        content += "<div style='width:100%;height:1px;margin:5px;clear:both;background:rgba(255,255,255,0.1);'></div>";
        var breakpointsSorter = GET('BreakpointsSorter');
        content += breakpointsSorter.render();
        return content;
    };
    return SheetsPanel;
}(Panel));
//# sourceMappingURL=SheetsPanel.js.map