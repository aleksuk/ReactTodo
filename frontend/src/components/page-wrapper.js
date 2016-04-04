import React from 'react';
import MainHeader from './main-header';
import MainFooter from './main-footer';
import AlertNotify from './alert-notify';

export default class PageWrapper extends React.Component {

  render() {
    return (
      <div ref="app" className="page-wrapper">
        <section className="page-content">
          <MainHeader />
          {this.props.children}
        </section>

        <AlertNotify />
        <MainFooter />
      </div>
    );
  }

}
