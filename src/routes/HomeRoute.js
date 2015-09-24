'use strict';

import React   from 'react';

import FeedPage from '../components/pages/FeedPage.js';


export default function HomeRoute(params) {

  return new Promise(function(resolve, reject) {
    resolve({
      title   : "Feed",
      header  : "",
      component: FeedPage,
      componentProps: params
    });
  });

}