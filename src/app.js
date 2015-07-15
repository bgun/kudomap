'use strict';

import _ from 'lodash';

import HomeRoute  from './routes/HomeRoute.js';
import MapRoute   from './routes/MapRoute.js';
import TopicRoute from './routes/TopicRoute.js';

import RequestHelper from './utils/RequestHelper.js';

export default class App {

  constructor(app_settings) {

    this.settings = _.extend({
      // Settings that both client and server will need go here.
      // The client will have browser-specific tokens such as
      // Mapbox/Facebook access tokens, and the server will have
      // private constants like secret keys.
    }, app_settings);
    this.requestHelper = new RequestHelper({
      baseUrl: this.settings.api_url
    })

    this.routes = [
      { name: 'feed',  path: '/',         controller: HomeRoute },
      { name: 'map',   path: '/m/:map',   controller: MapRoute },
      { name: 'topic', path: '/t/:topic', controller: TopicRoute }
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