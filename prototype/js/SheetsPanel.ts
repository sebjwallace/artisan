
/// <reference path='Panel.ts'/>

class SheetsPanel extends Panel{

  render(){
      var content = "";
      var classSorter = GET('ClassSorter');
      content += classSorter.render();
      classSorter.update();
      content += "<div style='width:100%;height:1px;margin:5px;clear:both;background:rgba(255,255,255,0.1);'></div>";
      var breakpointsSorter = GET('BreakpointsSorter')
      content += breakpointsSorter.render();
      return content;
  }

}
