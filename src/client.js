'use strict';

import _     from 'lodash';
import page  from 'page';
import React from 'react';

import App from './app.js';

(function() {

  global.app = new App({
    api_url: '/',
    mapbox_token: "pk.eyJ1IjoiYmd1biIsImEiOiJlRTVXbENBIn0.tVaSmhr0MXPtu8hdktMl3g"
  });

  global.app.routes.forEach(function(route) {
    console.log("Adding route: "+route.path);
    page(route.path, function(ctx) {
      console.log("Following route %s",route.path, ctx.params);
      // Routes return a promise for a React element
      route.controller.call(global.app, ctx.params)
        .then(function(route_payload) {
          var payload = _.extend({}, App.defaults().route_payload, route_payload);
          React.render(payload.element, document.getElementById('page'));
        });
    });
  });

  console.log("Starting client at route %s", document.location.pathname);
  page();

})();