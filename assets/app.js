/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';
import './styles/base.css';
import './styles/grid.css';
import './styles/layout.css';
import './styles/style.min.css';
import './styles/enfold.css';
import './styles/custom.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main'

ReactDOM.render (
    <Main />
    , document.getElementById('root')
);