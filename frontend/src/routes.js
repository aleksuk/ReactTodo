import React from 'react';
import { Router, Route, Link, hashHistory } from 'react-router';
import PageWrapper from './components/page-wrapper';
import MainSection from './components/main-section';

export default (
  <Router history={hashHistory}>
    <Route name="app" path="/" component={PageWrapper}>
      <Route name="todos" path="todos" component={MainSection} />
    </Route>
  </Router>
);