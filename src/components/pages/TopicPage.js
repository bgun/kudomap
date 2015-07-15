'use strict';

import React from 'react';

import NavBar from '../NavBar.js';

export default class KudoPage extends React.Component {

  render() {

    var postsList = this.props.posts.map(function(p) {
      return (
        <li>{ p.title }</li>
      );
    });

    return (
      <div id="topicPage" className="page">
        <NavBar />
        <section id="topicHeader">
          <h1>{ this.props.kudo }</h1>
        </section>
        <section id="topicPosts">
          <ul>
            { postsList }
          </ul>
        </section>
      </div>
    )
  }

}