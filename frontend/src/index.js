import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';

window.addEventListener('load', function () {
  ReactDOM.render(Router, document.getElementById('content'));
});
