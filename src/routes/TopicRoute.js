'use strict';

import React   from 'react';

import TopicPage from '../components/pages/TopicPage.js';


export default function TopicRoute(params) {

  return new Promise(function(resolve, reject) {

    var url = 'api/posts/topic/'+params.topic;
    global.stuff.requestHelper.get(url, { key: 'posts' })
      .then(function(posts) {
        resolve({
          title: "Topic",
          header: "",
          component: TopicPage,
          componentProps: {
            posts: posts
          }
        });
      })
      .catch(function() {
        console.error("ERROR: TopicRoute");
      });

  });

}