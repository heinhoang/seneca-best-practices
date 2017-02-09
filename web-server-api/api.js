var seneca = require('seneca')();

seneca.add({role: 'math', cmd: 'sum'}, function (msg, respond) {
  var sum = msg.left + msg.right
  respond(null, {answer: sum})
});

seneca.add({role: 'math', cmd: 'product'}, function (msg, respond) {
  var product = msg.left * msg.right
  respond(null, { answer: product })
});

module.exports = function api(options) {
    var validOptions = { sum: 'sum', product: 'product' };

    // a normal plugin uses math plugin
    this.add('role:api, path:calculate', function (msg, response) {
        var operation = msg.args.params.operation;
        var left = msg.args.query.left;
        var right = msg.args.query.right;
        // send request to math plugin
        this.act('role: math', {
            cmd: validOptions[operation],
            left: left,
            right: right
        }, response);
    });

    // do this first
    // accept sth like this: http://localhost:3000/api/calculate/sum?left=2&right=3
    this.add('init:api', function(msg, response) {
        // send request to a plugin of SenecaWeb, this plugin will parse url which you send
        this.act('role:web',{ routes: {
            // check if url start with '/api'
            prefix: '/api',
            // then send this pattern to this plugin
            pin: 'role:api,path:*',
            // path in the above pattern will be 'calculate'
            // and all suffix after it will be `:operation` which is param or GET query
            map: {
                calculate: {GET: true, suffix: '/:operation'}
            }
        }},response);
    });

}