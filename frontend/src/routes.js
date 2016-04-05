import React from 'react';
import { Router, Route, Link, hashHistory, Redirect } from 'react-router';
import PageWrapper from './components/page-wrapper';
import MainSection from './components/main-section';

export default (
  <Router history={hashHistory}>
    <Redirect from="/" to="todos" />
    <Route name="app" path="/" component={PageWrapper}>
      <Route name="todos" path="todos" component={MainSection} />
    </Route>
  </Router>
);
