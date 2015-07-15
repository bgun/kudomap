'use strict';

import Promise from 'bluebird';
import React   from 'react';

import TopicPage from '../components/pages/TopicPage.js';


export default function TopicRoute(params) {

  return new Promise(function(resolve, reject) {

    var url = '/api/posts/topic/'+params.topic;
    global.app.requestHelper.get(url, { key: 'posts' })
      .then(function(posts) {
        resolve({
          title: "Topic",
          header: "",
          element: React.createElement(TopicPage, { posts: posts })
        });

      });
  });

}