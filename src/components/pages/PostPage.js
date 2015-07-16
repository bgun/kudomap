'use strict';

import React from 'react';

import NavBar from '../NavBar.js';

export default class PostPage extends React.Component {

  var post = this.props.post;

  render() {
    return (
      <div id="postPage" className="page">
        <NavBar />
        <h1>{ post.name }</h1>
      </div>
    )
  }

}
