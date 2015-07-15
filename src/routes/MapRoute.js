'use strict';

import Promise from 'bluebird';
import React   from 'react';

import MapPage from '../components/pages/MapPage.js';


export default function MapRoute(params) {

  return new Promise(function(resolve, reject) {
    resolve({
      title: "Map",
      header: "",
      element: React.createElement(MapPage, params)
    });
  });

}