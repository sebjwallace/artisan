import React from 'react';
import ReactDOM from 'react-dom'

import {Outliner} from './components/Outliner';

const outliner = new Outliner(
  document.getElementById('root'),
  document.getElementById('outliner'))
    .render();
