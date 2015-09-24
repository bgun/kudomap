'use strict';

import _     from 'lodash';
import page  from 'page';
import Parse from 'parse';
import React from 'react';

import App from './App.js';

import routes from './routes.js';


(function() {

  Parse.initialize("1by1WRUVNk60ElY2sAxjLfDGqwEoLw7LR7ebSaBw", "ptyZJUMya0BIE3zGST0Y0X4chLhzfR1Z3JZLATpW");

  let routeContext = {};

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