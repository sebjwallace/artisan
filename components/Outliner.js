import { JASS } from 'jass-js';
import { DOMTraverse } from '../classes/DOMTraverse';

export class Outliner{
  constructor(source,target){
    this.source = source;
    this.target = target;
    this.styles = new JASS.Component({
      BASE:{
        position: 'fixed',
        height: '100%',
        right: 0,
        top: 0,
        'background-color': '#EFEFEF'
      },
      '.group':{
        position: 'relative',
        cursor: 'pointer',
        padding: '2px',
        'padding-left': '10px',
        border: 'solid 1px rgba(0,0,0,0.1)',
        '> :hover': {
          'background-color': 'rgba(100,180,220,0.2)',
          'border-color': 'rgba(100,180,220,0.8)'
        }
      }
    });
  }
  render(){
    const domTree = new DOMTraverse({
      className: 'group'
    });
    const tree = domTree.render(this.source).toElement();
    tree.className = this.styles.className();
    this.target.appendChild(tree);
    domTree.events.clicked = (el,node) => {
      for(let i=0; i < el.children.length; i++){
        if(el.children[i].style.display == "none")
          el.children[i].style.display = "block";
        else el.children[i].style.display = "none";
      }
    }
    domTree.events.enter = (el,node) => { node.style.backgroundColor = `rgba(100,180,220,0.${el.style.zIndex})`; }
    domTree.events.leave = (el,node) => { node.style.backgroundColor = null }
  }
}
