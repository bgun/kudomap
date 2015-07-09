'use strict';

require('babel/polyfill');

var FeedRoute = require('./routes/FeedRoute.js')
var KudoRoute = require('./routes/KudoRoute.js')

module.exports = class App {

  constructor(settings) {

    this.settings = settings || {};

    this.routes = [

      { name: 'feed', path: '/',        controller: FeedRoute },
      { name: 'kudo', path: '/k/:kudo', controller: KudoRoute }

    ];
  }

  // all routes return an object of this form. These are the defaults.
  static defaults() {
    return {
      route_payload: {
        title: "ERROR NO TITLE",
        header: "",
        element: null
      }
    }
  }

}