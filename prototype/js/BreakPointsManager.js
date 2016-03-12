/// <reference path='Observable.ts' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BreakpointsManager = (function (_super) {
    __extends(BreakpointsManager, _super);
    function BreakpointsManager(stylesContainer) {
        _super.call(this);
        this.stylesContainer = stylesContainer;
        this.points = [];
        this.points["1200"] = $('[artisan-breakpoint="0 > 1200"]');
    }
    BreakpointsManager.prototype.addBreakpoint = function (title) {
        var max = title.substring(title.indexOf("> ") + 2);
        max = parseInt(max);
        var content = "<style artisan-breakpoint='" + title + "' artisan-breakpoint-max='" + max + "'></style>";
        var smallest = 2000;
        var before = null;
        for (var _point in this.points) {
            var point = this.points[_point];
            _point = parseInt(_point);
            if (max < _point && _point < smallest) {
                before = point;
                smallest = _point;
            }
            ;
        }
        if (before) {
            $(content).insertAfter(before);
        }
        else {
            var biggest = 0;
            var before = null;
            for (var _point in this.points) {
                var point = this.points[_point];
                if (_point > biggest) {
                    before = point;
                    biggest = _point;
                }
                ;
            }
            $(content).insertAfter(before);
        }
        this.points[max] = $('[artisan-breakpoint="' + title + '"]');
        this.update("newBreakpoint");
    };
    BreakpointsManager.prototype.removeBreakpoint = function (title) {
        $("[artisan-breakpoint='" + title + "']").remove();
        delete this.points[title];
        this.update("removeBreakpoint");
    };
    BreakpointsManager.prototype.setBreakpoint = function (title) {
        if (typeof title == "object") {
            this.stylesContainer.setContainer(title);
        }
        var newContainer = $("[artisan-breakpoint='" + title + "']");
        if (newContainer.length > 0) {
            this.stylesContainer.setContainer(newContainer);
        }
        else {
            return false;
        }
    };
    BreakpointsManager.prototype.getBreakpoints = function () {
        var bpts = $('[artisan-breakpoint]');
        var list = [];
        for (var i = 0; i < bpts.length; i++) {
            "";
            var item = {};
            item['max'] = $(bpts[i]).attr('artisan-breakpoint');
            item['element'] = bpts[i];
            list.push(item);
        }
        return list;
    };
    BreakpointsManager.prototype.checkBreakpoints = function (title) {
        if (this.points[title]) {
            return this.points[title];
        }
        else {
            return false;
        }
    };
    BreakpointsManager.prototype.toggleBreakpoints = function (val) {
        val;
        var invisibleTagStart = "/*invisible ";
        var invisibleTagEnd = " invisible*/";
        for (var bp in this.points) {
            var el = this.points[bp];
            var hasInvisibleTags = el.html().indexOf(invisibleTagStart);
            if (bp < val && hasInvisibleTags == -1) {
                el.html(invisibleTagStart + el.html() + invisibleTagEnd);
            }
            else if (bp >= val && hasInvisibleTags != -1) {
                el.html(el.html().replace(invisibleTagStart, "").replace(invisibleTagEnd, ""));
            }
            ;
        }
        var selectedBreakpoint = this.checkBreakpoints(val);
        this.setBreakpoint(selectedBreakpoint);
    };
    return BreakpointsManager;
}(Observable));
//# sourceMappingURL=BreakPointsManager.js.map