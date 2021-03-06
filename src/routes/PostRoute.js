'use strict';

import React   from 'react';

import PostPage from '../components/pages/PostPage.js';


export default function PostRoute(params) {

  return new Promise(function(resolve, reject) {

    var url = 'api/posts/topic/'+params.topic;
    global.app.requestHelper.get(url, { key: 'post' })
      .then(function(posts) {
        resolve({
          title: "Post",
          header: "",
          component: PostPage,
          componentProps: params
        });
      });

  });

}