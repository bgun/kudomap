'use strict';

import React from 'react';

import NavBar   from '../NavBar.js';
import PostItem from '../PostItem.js';

export default class TopicPage extends React.Component {

  render() {

    var posts = this.props.posts;
    var kudo  = this.props.kudo;

    return (
      <div id="topicPage" className="page">
        <NavBar />
        <section id="topicHeader">
          <h1>Topic: { kudo }</h1>
        </section>
        <section id="topicPosts">
          <ul className="post-list">
            { posts.map(p => <PostItem key={ p.post_id } post={ p } />) }
          </ul>
        </section>
      </div>
    )
  }

}