var BreakpointsSorter = (function () {
    function BreakpointsSorter(breakpointsManager, overlayContainer) {
        var _this = this;
        this.breakpointsManager = breakpointsManager;
        this.overlayContainer = overlayContainer;
        this.update = function () {
            var container = $("#" + _this.id);
            var bpts = _this.breakpointsManager.getBreakpoints();
            var content = "";
            for (var bpt in bpts) {
                content += "<option value='" + bpts[bpt].max + "'>" + bpts[bpt].max + "</option>";
            }
            container.html(content);
        };
        this.id = "artisan-breakpoints-sorter";
        this.breakpointsManager.observe(this.update, "newBreakpoint");
    }
    BreakpointsSorter.prototype.render = function () {
        var content = "";
        content += "<div id='" + this.id + "-slider'></div>" + "<input id='" + this.id + "-field' type='text'>" + "<button id='" + this.id + "-add'>+</button>" + "<button id='" + this.id + "-remove'>-</button>";
        content += "<select id='" + this.id + "'></select>";
        this.events();
        return content;
    };
    BreakpointsSorter.prototype.change = function (val) {
        val;
        $("#artisan-container").width(val); //$>* css:change width of container;
        this.overlayContainer.update();
        this.breakpointsManager.toggleBreakpoints(val);
    };
    BreakpointsSorter.prototype.events = function () {
        var _this = this;
        $("#" + this.id).ready(function () {
            _this.update();
            $("#" + _this.id + "-add").click(function () {
                var title = $("#" + _this.id + "-field").val();
                _this.breakpointsManager.addBreakpoint(title);
            });
            $("#" + _this.id + "-slider").slider({
                range: true,
                min: 0,
                max: 1200,
                step: 10,
                values: [0, 1200],
                slide: function (event, ui) {
                    $("#" + _this.id + "-field").val(ui.values[0] + " > " + ui.values[1]);
                    _this.change(ui.values[1]);
                },
                change: function (event, ui) {
                    $("#" + _this.id + "-field").val(ui.values[0] + " > " + ui.values[1]);
                    _this.change(ui.values[1]);
                },
            });
            $('#' + _this.id).change(function (e) {
                var values = $('#' + this.id).val().split(" > ");
                var $slider = $('#' + this.id + "-slider");
                $slider.slider("values", 1, values[1]);
            });
        });
    };
    return BreakpointsSorter;
}());
