'use strict';

import Promise from 'bluebird';
import React   from 'react';

import KudoPage from '../components/pages/KudoPage.js';


module.exports = function(params) {

  return new Promise(function(resolve, reject) {
    resolve({
      title: "Topic",
      header: "",
      element: React.createElement(KudoPage, params)
    });
  });

}