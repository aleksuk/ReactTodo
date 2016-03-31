import React from 'react';
import MainHeader from './main-header';
import MainFooter from './main-footer';

export default class PageWrapper extends React.Component {
  
  render() {
    return (
      <div className="page-wrapper">
        <section className="page-content">
          <MainHeader />
          {this.props.children}
        </section>
        <MainFooter />
      </div>
    );
  }
  
}
