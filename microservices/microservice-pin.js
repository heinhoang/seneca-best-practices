// To use use, run `node microservice-pin.js`
// Then, run `node microservice-client-pin.js`
require('seneca')()
    .use('math-plugin')
    // listen for role:math messages only
    .listen({type: 'tcp', pin: 'role: math'});