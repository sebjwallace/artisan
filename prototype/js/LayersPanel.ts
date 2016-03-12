
/// <reference path='Panel.ts'/>

class LayersPanel extends Panel{

  private id = "jstree";

  constructor(private selectedElement){
    super();
    selectedElement.observe(this.update, "newSelectedElement");
    this.render();
  }

  render(){
      var html = $('#artisan-container').html();
      var htmlJson = html2json(html);
      var getElDetails = function(obj) {
          var details = {};
          var tag = obj['tag'];
          var targetId = obj['attr']['artisan-element'];
          if (targetId) {
              details['data'] = targetId;
          }
          details['text'] = "<span class='artisan-tag-" + tag + "'>" + tag + "</span>";
          if (obj['attr']['id']) {
              details['id'] = "jstree-" + obj['attr']['id'];
              details['text'] += " <span class='artisan-tint'>#" + obj['attr']['id'] + "</span>";
          }
          details['state'] = {
              'opened': true
          };
          if (obj['child']) {
              details['children'] = [];
              for (var i = 0; i < obj['child'].length; i++) {
                  details['children'].push(getElDetails(obj['child'][i]));
              }
          }
          return details;
      }
      var domJson = getElDetails(htmlJson);
      //console.log(htmlJson);
      $('#' + this.id).ready(() => {
          $('#' + this.id).on('changed.jstree', (e, data) => {
              new ClickableEvent(e, $("[artisan-element='" + data.node.data + "']")[0]);
          }).jstree({
              'core': {
                  'data': domJson,
                  "plugins": ["checkbox", "contextmenu", "dnd", "massload", "search", "sort", "state", "types", "unique", "wholerow", "changed", "conditionalselect"]
              }
          });
      });

      return "<div id='"+this.id+"'></div>"
  }

  update = () => {
    $('.jstree-clicked').removeClass('jstree-clicked');
    $('#jstree-'+this.selectedElement.getId()+" .jstree-anchor").addClass('jstree-clicked');
  }

  refresh(){
    $('#'+this.id).html('');
    this.render();
  }

}
