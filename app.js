// define globals
var express = require('express'),
    io = require('socket.io'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = io.listen(server),
    socket = require('./server/socket.js'),
    path = require('path');
var request = require("request");

// view engine setup (for later)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// start the server
server.listen(1986);


// for dev
app.use(express.static(__dirname + '/dev/'));
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
module.exports = io;

console.log("server starteds");

io.sockets.on('connection', socket);