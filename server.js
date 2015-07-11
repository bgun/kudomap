'use strict';

var _          = require('lodash');
var bodyParser = require('body-parser')
var express    = require('express');
var fs         = require('fs');
var React      = require('react');

var port = process.env.PORT || 9000;

var server = express();

server.use(bodyParser.json());      // to support JSON-encoded bodies
//server.use(express.json());         // to support JSON-encoded bodies
// For now, all POSTs should be JSON
//server.use(bodyParser.urlencoded({  // to support URL-encoded bodies
//  extended: true
//}));
//server.use(express.urlencoded());   // to support URL-encoded bodies

var App = require('./build/app.js');

var apiManager = require('./build/api.js');

// TODO: Cache all HTML
// var indexHtml = fs.readFileSync('./index.html', { encoding: 'utf-8' });

console.log('\n\n### ROUTES\n');

global.app = new App();
global.app.routes.forEach(function(route) {

  console.log("Adding route: "+route.path);
  server.get(route.path, function(req, res) {
    console.log("Following route %s",route.path, req.params);
    // Routes return a promise for a React element
    route.controller.apply(global.app, [req.params, req.query])
      .then(function(route_payload) {
        var payload = _.extend({}, App.defaults().route_payload, route_payload);
        // render the ReactElement returned by the controller to
        // a static HTML string. This is our page content.
        var elementHtml = React.renderToStaticMarkup(payload.element);
        // replace token values in the source HTML file

        // TODO: after caching HTML above, change this line
        var html = fs.readFileSync('./index.html', { encoding: 'utf-8' })
          .replace('{{HEAD}}',    payload.header)
          .replace('{{CONTENT}}', elementHtml);
        res.setHeader('Content-Type','text/html');
        res.send(html);
      })
      .catch(function(err) {
        throw err;
      });
  });

});

console.log('\n\n### API PATHS\n');

var settings = {
  db_conn: {
    user     : "sdiaxjudkljxoc",
    password : "bx1UQAEo1ymJ07zb6JcWytHohc",
    database : "d9f5ta5485h31e",
    host     : "ec2-54-225-134-223.compute-1.amazonaws.com",
    port     : 5432,
    ssl      : true
  }
};

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

console.log('\nServing static assets at /public');
server.use('/public', express.static('./public'));
server.use('/public', express.static('./build/public'));

server.get('*', function(req, res) {
  res.status(404).send('<h1>404 not found</h1>');
});

server.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('<h1>Something broke!</h1>');
});

console.log("\nServer started successfully, listening on port %d", port);
server.listen(port);