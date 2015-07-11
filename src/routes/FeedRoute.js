'use strict';

import Promise from 'bluebird';
import React   from 'react';


class FeedPage extends React.Component {

  render() {
    return (
      <div id="feed-page">
        <h1>Feed</h1>
        <a href="/k/ben">Kudo: Ben</a>
      </div>
    )
  }

}

module.exports = function(params) {

  return new Promise(function(resolve, reject) {
    resolve({
      title   : "Feed",
      header  : "",
      element : React.createElement(FeedPage, params)
    });
  });

}