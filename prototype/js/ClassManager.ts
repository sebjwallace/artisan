
class ClassManager extends Observable{

  private target;

  constructor(){
    super();
      this.target = "artisan-styles-container";
      $("#" + this.target).append(".floater{float:left;}.orangeGuy{color:orange;}");
  }

  getClasses(){
      var code = $("#" + this.target).html();
      var start = "{";
      var end = "}";
      var startPos = code.indexOf(start);
      var i = 0;
      while (startPos != -1) {
          var endPos = code.indexOf(end, startPos + 1);
          var block = code.substring(startPos, endPos + 1);
          code = code.replace(block, "");
          startPos = code.indexOf(start, startPos + 1);
          i++;
          if (i == 100) {
              break;
          };
      }
      code = code.replace(/\./g, "!.").replace(/\#/g, "!#");
      code = code.split("!");
      var newCode = [];
      for (let _part in code) {
          var part = code[_part];
          if (part.indexOf("#") == -1) {
              newCode.push(part);
          };
      }
      return newCode;
  }

}
