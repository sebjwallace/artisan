
/// <reference path='Observable.ts' />

class BreakpointsManager extends Observable{

  private points = [];

    constructor(private stylesContainer){
        super();
        this.points["1200"] = $('[artisan-breakpoint="0 > 1200"]');
    }

    addBreakpoint(title){
        var max = title.substring(title.indexOf("> ") + 2);
        max = parseInt(max);
        var content = "<style artisan-breakpoint='" + title + "' artisan-breakpoint-max='" + max + "'></style>";
        var smallest = 2000;
        var before = null;
        for (let _point in this.points) {
            var point = this.points[_point];
            _point = parseInt(_point);
            if (max < _point && _point < smallest) {
                before = point;
                smallest = _point;
            };
        }
        if (before) {
            $(content).insertAfter(before);
        } else {
            var biggest = 0;
            var before = null;
            for (let _point in this.points) {
                var point = this.points[_point];
                if (_point > biggest) {
                    before = point;
                    biggest = _point;
                };
            }
            $(content).insertAfter(before);
        }
        this.points[max] = $('[artisan-breakpoint="' + title + '"]');
        this.update("newBreakpoint");
    }

    removeBreakpoint(title) {
        $("[artisan-breakpoint='" + title + "']").remove();
        delete this.points[title];
        this.update("removeBreakpoint");
    }

    setBreakpoint(title) {
        if (typeof title == "object") {
            this.stylesContainer.setContainer(title);
        }
        var newContainer = $("[artisan-breakpoint='" + title + "']");
        if (newContainer.length > 0) {
            this.stylesContainer.setContainer(newContainer);
        } else {
            return false;
        }
    }

    getBreakpoints() {
        var bpts = $('[artisan-breakpoint]');
        var list = [];
        for (let i = 0; i < bpts.length; i++) {``
            var item = {};
            item['max'] = $(bpts[i]).attr('artisan-breakpoint');
            item['element'] = bpts[i];
            list.push(item);
        }
        return list;
    }

    checkBreakpoints(title) {
        if (this.points[title]) {
            return this.points[title];
        } else {
            return false;
        }
    }

    toggleBreakpoints(val) {
        val;
        var invisibleTagStart = "/*invisible ";
        var invisibleTagEnd = " invisible*/";
        for (let bp in this.points) {
            var el = this.points[bp];
            var hasInvisibleTags = el.html().indexOf(invisibleTagStart);
            if (bp < val && hasInvisibleTags == -1) {
                el.html(invisibleTagStart + el.html() + invisibleTagEnd);
            } else if (bp >= val && hasInvisibleTags != -1) {
                el.html(el.html().replace(invisibleTagStart, "").replace(invisibleTagEnd, ""));
            };
        }
        var selectedBreakpoint = this.checkBreakpoints(val);
        this.setBreakpoint(selectedBreakpoint);
    }

}
