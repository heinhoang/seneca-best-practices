/**
 * Start server: `node server-senecaweb.js`
 * navigate to sth like this: http://localhost:3000/api/calculate/sum?left=2&right=3
*/
var SenecaWeb = require('seneca-web');
var Express = require('express');
var Router = Express.Router;
var context = new Router();

var senecaWebConfig = {
    // set SenecaWeb Router (context) as Express Router
    context: context,
    // allow SenecaWeb connect with Express
    adapter: require('seneca-web-adapter-express'),
    // so we can use body-parser
    options: {parseBody: false} 
};

var app = Express()
    // use body-parser to get params
    .use( require('body-parser').json() )
    // use Router() to get queries from web broswer
    .use( context )
    .listen(3000, function() {
        console.log('connected to server');
    });

var seneca = require('seneca')()
    // use relationship between SenecaWeb and Express
    .use(SenecaWeb, senecaWebConfig)
    // use api plugin
    .use('./web-server-api/api')
    // send client request to plugin
    .client({ type: 'tcp', pin: 'role: math' });