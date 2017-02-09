var seneca = require('seneca');

// declare plugin
function minimumPlugin(options) {
    console.log(options);
}

// using plugin
seneca.use(minimumPlugin, {foo: 'bar'});