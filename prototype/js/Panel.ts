
abstract class Panel{
    renderBlock(items){
        var code = "<div class='col-half'>";
        var counter = 0;
        for (let item in items) {
            if (counter == 2) {
                code += "</div><div class='col-half'>";
                counter = 0;
            }
            code += items[item] + "<br>";
            code += GET('StyleToggleSlider',items[item]) + "<br>";
            counter++;
        }
        code += "</div>";
        return code;
    }

}
