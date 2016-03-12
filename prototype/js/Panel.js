var Panel = (function () {
    function Panel() {
    }
    Panel.prototype.renderBlock = function (items) {
        var code = "<div class='col-half'>";
        var counter = 0;
        for (var item in items) {
            if (counter == 2) {
                code += "</div><div class='col-half'>";
                counter = 0;
            }
            code += items[item] + "<br>";
            code += GET('StyleToggleSlider', items[item]) + "<br>";
            counter++;
        }
        code += "</div>";
        return code;
    };
    return Panel;
}());
//# sourceMappingURL=Panel.js.map