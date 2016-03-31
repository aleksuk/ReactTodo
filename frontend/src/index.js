import React from 'react';
import ReactDOM from 'react-dom';
import MainHeader from './components/main-header';
import MainSection from './components/main-section';
import Router from './routes';

window.addEventListener('load', function () {
  ReactDOM.render(Router, document.getElementById('content'));
});