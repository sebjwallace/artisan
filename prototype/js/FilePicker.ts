
class FilePicker{

    constructor(private attribute, private stylesContainer, private selectedElement) {
        selectedElement.observe(this.update, "newSelectedElement");
        this.stylesContainer.observe(this.update, this.attribute);
    }

    render(){
        let content = '<div class="fileUpload"><span id="artisan-file-upload-'
        + this.attribute + '">' + this.attribute + '</span>'
        + '<input type="file" class="upload" id="artisan-file-upload-input-'
        + this.attribute + '" /></div>';
        $("#artisan-file-upload-input-" + this.attribute).ready(function() {
            $("#artisan-file-upload-input-" + this.attribute).change(function() {
                this.stylesContainer.setStyle(this.attribute, "url('images/" + this.files[0].name + "')");
            });
        });
        return content;
    }

    update = () => {
        var attr = this.stylesContainer.getStyle(this.attribute);
        attr = attr.replace("url('images/", "").replace("')", "");
        $('#artisan-file-upload-' + this.attribute).html(attr);
    }

}
