import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
  render(){

    let level = 0;
    let tree = [];
    let key = 0;
    let parent = document.getElementById('outliner');

    const traverse = (node) => {
      if(!node.nodeName) return;
      level++;
      key++;
      const el = document.createElement('div');
      el.className = "el-group";
      let html = '';
      if(node.id) html += `id="${node.id}"`;
      if(node.className) html += `class="${node.className}"`;
      el.innerHTML = `&lt; ${node.nodeName.toLowerCase()} ${html} &gt;`;
      el.parent = parent;
      parent.appendChild(el);
      parent = el;
      // tree.push(<div style={{paddingLeft:(level*5) +'px'}} key={key}>{ node.nodeName.toLowerCase() }</div>);
      console.log(node.nodeName + ' ' + level);
      for(let child in node.children){
        traverse(node.children[child]);
      }
      parent = parent.parent;
      level--;
    }

    traverse(document.getElementById('root'));

    return <div>
      { tree }
    </div>
  }
}

export default App;
