
$.extend({
    replaceTag: function (currentElem, newTagObj, keepProps) {
        var $currentElem = $(currentElem);
        var i, $newTag = $(newTagObj).clone();
        if (keepProps) {
            newTag = $newTag[0];
            newTag.className = currentElem.className;
            $.extend(newTag.classList, currentElem.classList);
            $.extend(newTag.attributes, currentElem.attributes);
        }
        $currentElem.wrapAll($newTag);
        $currentElem.contents().unwrap();
        return this;
    }
});

$.fn.extend({
    replaceTag: function (newTagObj, keepProps) {
        return this.each(function() {
            jQuery.replaceTag(this, newTagObj, keepProps);
        });
    }
});