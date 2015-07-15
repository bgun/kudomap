'use strict';

import React from 'react';

import NavBar   from '../NavBar.js';
import PostItem from '../PostItem.js';

export default class TopicPage extends React.Component {

  render() {

    console.log(this.props.posts);

    return (
      <div id="topicPage" className="page">
        <NavBar />
        <section id="topicHeader">
          <h1>{ this.props.kudo }</h1>
        </section>
        <section id="topicPosts">
          <ul className="post-list">
            { this.props.posts.map(p => <PostItem key={ p.post_id } post={ p } />) }
          </ul>
        </section>
      </div>
    )
  }

}