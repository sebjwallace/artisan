var FilePicker = (function () {
    function FilePicker(attribute, stylesContainer, selectedElement) {
        var _this = this;
        this.attribute = attribute;
        this.stylesContainer = stylesContainer;
        this.selectedElement = selectedElement;
        this.update = function () {
            var attr = _this.stylesContainer.getStyle(_this.attribute);
            attr = attr.replace("url('images/", "").replace("')", "");
            $('#artisan-file-upload-' + _this.attribute).html(attr);
        };
        selectedElement.observe(this.update, "newSelectedElement");
        this.stylesContainer.observe(this.update, this.attribute);
    }
    FilePicker.prototype.render = function () {
        var content = '<div class="fileUpload"><span id="artisan-file-upload-'
            + this.attribute + '">' + this.attribute + '</span>'
            + '<input type="file" class="upload" id="artisan-file-upload-input-'
            + this.attribute + '" /></div>';
        $("#artisan-file-upload-input-" + this.attribute).ready(function () {
            $("#artisan-file-upload-input-" + this.attribute).change(function () {
                this.stylesContainer.setStyle(this.attribute, "url('images/" + this.files[0].name + "')");
            });
        });
        return content;
    };
    return FilePicker;
}());
