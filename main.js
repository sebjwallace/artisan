import React from 'react';
import ReactDOM from 'react-dom'

import { DOMTraverse } from './classes/DOMTraverse';

const domTree = new DOMTraverse;
const tree = domTree.render(document.getElementById('root')).toString();

document.getElementById('root').innerHTML = tree;
