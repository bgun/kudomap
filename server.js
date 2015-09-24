'use strict';

var _          = require('lodash');
var bodyParser = require('body-parser');
var express    = require('express');
var fs         = require('fs');
var React      = require('react');

var RequestHelper = require('./build/utils/RequestHelper.js');

var App        = require('./build/App.js');
var routes     = require('./build/routes.js');

var port = process.env.PORT || 9000;

var server = express();

server.use(bodyParser.json()); // to support JSON-encoded bodies
/* Uncomment to support URL-encoded POSTs.
 * server.use(bodyParser.urlencoded({  // to support URL-encoded bodies
 *   extended: true
 * }));
 */

var App = require('./build/app.js');

var apiManager = require('./build/api.js');

// TODO: Cache all HTML
// var indexHtml = fs.readFileSync('./index.html', { encoding: 'utf-8' });

console.log('\n\n### ROUTES\n');

global.stuff = {
  requestHelper: new RequestHelper({
    baseUrl: 'http://localhost:9000/'
  })
};
_.each(routes, function(route) {

  console.log("Adding route: "+route.path);
  server.get(route.path, function(req, res) {
    console.log("Following route %s",route.path, req.params);

    // Routes return a promise for a React element
    console.log(route);
    route.controller.apply(global.app, [req.params, req.query])
      .then(function(route_payload) {
        console.log("wat");
        // render the ReactElement returned by the controller to
        // a static HTML string. This is our page content.
        var elementHtml = React.renderToString(React.createElement(App, {
          component: route_payload.component,
          componentProps: route_payload.componentProps
        }));
        // replace token values in the source HTML file

        // TODO: after caching HTML above, change this line
        var html = fs.readFileSync('./index.html', { encoding: 'utf-8' })
          .replace('{{HEAD}}',    route_payload.header)
          .replace('{{CONTENT}}', elementHtml);

        res.setHeader('Content-Type','text/html');
        res.send(html);
      })
      .catch(function(err) {
        throw err;
      });
  });

});

var settings = {
  // Heroku Postgres credentials
  db_conn: {
    user     : "sdiaxjudkljxoc",
    password : "bx1UQAEo1ymJ07zb6JcWytHohc",
    database : "d9f5ta5485h31e",
    host     : "ec2-54-225-134-223.compute-1.amazonaws.com",
    port     : 5432,
    ssl      : true
  }
};

console.log('\n\n### API PATHS\n');

apiManager.routes.forEach(function(api_route) {

  var path = apiManager.basePath + api_route.path;
  console.log("Adding API path: ", path);
  switch(api_route.method) {
    case 'GET':
      server.get(path, function(req, res) {
        api_route.handler.apply(null, [req, res, settings]);
      });
      break;
    case 'POST':
      server.post(path, function(req, res) {
        api_route.handler.apply(null, [req, res, settings]);
      });
      break;
  }

});

// Serving static assets from /public. Multiple entries for the
// same paths override in order. For example, the file /build/public/foo.css
// would be shown instead of /public/foo.css. In general, though, try
// to avoid any overlapping names to minimize confusion.
console.log('\nServing static assets at /public');
server.use('/public', express.static('./public'));
server.use('/public', express.static('./build/public'));

// 404 Not Found error page
server.get('*', function(req, res) {
  res.status(404).send('<h1>404 not found</h1>');
});

// 500 Server Error page
server.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('<h1>Something broke!</h1>');
});

console.log("\nServer started successfully, listening on port %d", port);
server.listen(port);