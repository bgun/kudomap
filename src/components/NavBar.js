'use strict';

import React from 'react';

export default class NavBar extends React.Component {

  render() {
    return (
      <nav id="navBar">
        <h1 id="navBar-title">Nav Bar</h1>
        <ul className="list-horiz">
          <h4 className="list-title">Test Links</h4>
          <li><a href="/">Home</a></li>
          <li><a href="/t/todo">Todo</a></li>
          <li><a href="/t/notfound/">nonexistent</a></li>
        </ul>
      </nav>
    );
  }

}