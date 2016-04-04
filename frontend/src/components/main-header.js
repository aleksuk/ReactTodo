import React from 'react';

export default class MainHeader extends React.Component {

  render() {
    return (
      <header className="main-header">
        <nav className="navbar navbar-inverse navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <h1 className="navbar-brand">Todo List</h1>
            </div>
          </div>
        </nav>
      </header>
    );
  }
  
}
