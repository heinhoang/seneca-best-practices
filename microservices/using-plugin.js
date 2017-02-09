// To use use, run `node using-plugin.js`
var seneca = require('seneca')();
var mathPlugin = require('./math-plugin');

seneca
    .use(mathPlugin)
    .act('role:math,cmd:sum,left:1,right:2', console.log);

seneca
    .use('math-plugin') // finds ./math.js in local folder
    .act('role:math,cmd:sum,left:1,right:2', console.log);