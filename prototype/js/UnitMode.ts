class UnitMode{

    private options = ["%", "px", "em", "pt"];

    convert(attribute, val, from, to, $parent){
        $parent;
        if (attribute == "height" || attribute == "top" || attribute == "margin-top" || attribute == "margin-bottom" || attribute == "padding-top" || attribute == "padding-bottom") {
            var parentVal = parseInt($parent.outerHeight());
        } else {
            var parentVal = parseInt($parent.outerWidth());
        }
        if (to == "px" && from == "%") {
            return this.pxPc(val, parentVal);
        } else if (to == "%" && from == "px") {
            return this.pxPc(val, parentVal, true);
        }
    }

    pxPc(value, parentVal, reverse?){
        if (reverse == true) {
            return (parentVal / 100) * value;
        } else {
            return (value / parentVal) * 100;
        }
    }

}
