'use strict';

import _     from 'lodash';
import page  from 'page';
import React from 'react';

import App from './App.js';

import routes from './routes.js';

import RequestHelper from './utils/RequestHelper.js';

(function() {

  window.stuff = {
    requestHelper: new RequestHelper({
      baseUrl: '/'
    })
  };

  let routeContext = new App({
    mapbox_token: "pk.eyJ1IjoiYmd1biIsImEiOiJlRTVXbENBIn0.tVaSmhr0MXPtu8hdktMl3g"
  });

  let pageEl = document.getElementById('page');
  if (!pageEl) {
    throw new Error("########### ERROR: No page element!");
  }

  _.each(routes, function(route) {
    console.log("Adding route: "+route.path);
    page(route.path, function(ctx) {
      console.log("Following route %s",route.path, ctx.params);
      // Routes return a promise for a React element

      route.controller.call(routeContext, ctx.params)
        .then(function(route_payload) {

          React.render(
            <App component={ route_payload.component }
                 componentProps={ route_payload.componentProps } />
          , pageEl);
        });
    });
  });

  console.log("Starting client at route %s", document.location.pathname);
  page();

})();