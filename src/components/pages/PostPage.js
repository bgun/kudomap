'use strict';

import React from 'react';

import NavBar from '../NavBar.js';

export default class PostPage extends React.Component {

  render() {
    var post = this.props.post;
    return (
      <div id="postPage" className="page">
        <NavBar />
        <h1>{ post.name }</h1>
      </div>
    )
  }

}