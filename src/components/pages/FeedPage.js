'use strict';

import React from 'react';


export default class FeedPage extends React.Component {

  render() {
    return (
      <div id="feed-page">
        <h1>Feed</h1>
        <ul>
          <li><a href="/t/todo">Topic: Todo</a></li>
        </ul>
      </div>
    )
  }

}