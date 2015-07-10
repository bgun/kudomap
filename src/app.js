'use strict';

import _ from 'lodash';

import FeedRoute from './routes/FeedRoute.js';
import KudoRoute from './routes/KudoRoute.js';

module.exports = class App {

  constructor(settings) {

    this.settings = _.extend({
      // Settings that both client and server will need go here.
      // The client will have browser-specific tokens such as
      // Mapbox/Facebook access tokens, and the server will have
      // private constants like secret keys.
      foo: "BAR"
    }, settings);

    this.routes = [
      { name: 'feed', path: '/',        controller: FeedRoute },
      { name: 'kudo', path: '/k/:kudo', controller: KudoRoute }
    ];
  }

  // defaults for various object types
  static defaults() {
    return {
      // all routes return an object of this form. These are the defaults.
      route_payload: {
        title: "ERROR NO TITLE",
        header: "",
        element: null
      }
    }
  }

}