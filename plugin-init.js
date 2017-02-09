var fs = require('fs');
var seneca = require('seneca');

/**
 * If plugin initialization fails, then Seneca exits the Node.js process
 * To initialize a plugin, you add a special action pattern: init:<plugin-name>
*/
/**
 * Example:
 * When the plugin starts, it opens a log file and writes a log of all operations to the file. 
 * The file needs to open successfully and be writable. If this fails, the microservice should fail:
*/

function math(options) {
    var log;
    this.add('role:math,cmd:sum', sum);
    this.add('role:math,cmd:product', product);
    // declare which will be initialization, following this fomular: `init:<plugin-name>`
    this.add('init:math', init);

    function init(msg, response) {
        // open log file
        fs.open(options.logFile, 'a', function (err, fd) {
            // if err, nodejs will be stoped
            if (err) return response(err);
            // this file stream `fd` wil be writted to, later
            log = makeLog(fd);
            response();
        });
    }

    function sum(msg, respond) {
        var out = { answer: msg.left + msg.right }
        // write content to log file `fd`
        log('sum ' + msg.left + '+' + msg.right + '=' + out.answer + '\n')
        respond(null, out)
    }

    function product(msg, respond) {
        var out = { answer: msg.left * msg.right }
        // write content to log file `fd`
        log('product ' + msg.left + '*' + msg.right + '=' + out.answer + '\n')
        respond(null, out)
    }

    function makeLog(fd) {
        // want more parameter
        return function(entry) {
            fs.write(fd, new Date().toISOString() + ' ' + entry, null, 'utf8', function(err) {
                if(err) return console.log(err);
                // ensure log entry is flushed
                fs.fsync(fd, function(err) {
                    if(err) return console.log(err);
                });
            });
        }
    }

}

seneca.
use(math, {logFile: './math.log'})
.act('role:math,cmd:sum,left:1,right:2', console.log);