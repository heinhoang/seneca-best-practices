module.exports = function math(options) {
    this.add('role:math,cmd:sum', function sum(msg, respond) {
        respond(null, { answer: msg.left + msg.right })
    });

    this.add('role:math,cmd:product', function product(msg, respond) {
        respond(null, { answer: msg.left * msg.right })
    });

    // wrap two prior patterns into one
    // `role: math` is now called a pin pattern
    this.wrap('role: math', function(msg, respond) {
        // parse to interger if they're string
        msg.left = Number(msg.left).valueOf();
        msg.right = Number(msg.right).valueOf();
        // run the prior patterns
        this.prior(msg, respond);
    });
}