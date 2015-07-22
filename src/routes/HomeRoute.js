'use strict';

import Promise from 'bluebird';
import React   from 'react';

import FeedPage from '../components/pages/FeedPage.js';


export default function HomeRoute(params) {

  return new Promise(function(resolve, reject) {
    resolve({
      title   : "Feed",
      header  : "",
      element : React.createElement(FeedPage, params)
    });
  });

}