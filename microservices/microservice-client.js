// To use use, run `node microservice.js`
// Then, run `node microservice-client.js`
// `microservice-client.js` (client) will send request to `microservice.js` (server) and get the response
require('seneca')()
    .client()
    .act('role:math,cmd:sum,left:1,right:2',console.log);

/**
 * `microservice-client.js`                             → `microservice.js`
 * ---------------------------------------------------------------------------------------------------------
 * seneca.client(8080)                                  → seneca.listen(8080)
 * seneca.client(8080, '192.168.0.2')                   → seneca.listen(8080, '192.168.0.2')
 * seneca.client({ port: 8080, host: '192.168.0.2' })   → seneca.listen({ port: 8080, host: '192.168.0.2' })
 * seneca.client({ type: 'tcp' })                       → seneca.listen({ type: 'tcp' })
*/