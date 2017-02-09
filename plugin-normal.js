var seneca = require('seneca');

// declare plugin
function math(options) {
  this.add('role:math,cmd:sum', function (msg, respond) {
    respond(null, { answer: msg.left + msg.right })
  });

  this.add('role:math,cmd:product', function (msg, respond) {
    respond(null, { answer: msg.left * msg.right })
  });
}

// using plugin
seneca
    .use(math)
    .act('role: math, cmd: sum, left: 1, right: 2', console.log);