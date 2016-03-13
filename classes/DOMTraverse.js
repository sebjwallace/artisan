
export class DOMTraverse{
  constructor(config = {}){
    this.config = config;
    this.el;
  }
  render(root,callback){

    let level = 0;
    let parent = document.createElement('div');
    this.el = parent;

    const traverse = (node) => {
      if(!node.nodeName) return;
      level++;

      if(callback) callback(node,level);

      const el = document.createElement('div');
      el.className = this.config.className? this.config.className : "el-group";

      let html = '';
      if(node.id) html += `id="${node.id}"`;
      if(node.className) html += `class="${node.className}"`;
      el.innerHTML = `&lt; ${node.nodeName.toLowerCase()} ${html} &gt;`;

      el.parent = parent;
      parent.appendChild(el);
      parent = el;

      for(let child in node.children){
        traverse(node.children[child]);
      }
      level--;
      parent = parent.parent;
    }

    traverse(root);
    return this;
  }
  toElement(){
    return this.el;
  }
  toString(){
    return this.el.innerHTML;
  }
  toJson(){

  }
}
