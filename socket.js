var connectionsArray = [];

// export function for listening to the socket
module.exports = function(socket) {
    connectionsArray.push(socket);
    console.log('Number of connections:' + connectionsArray.length);
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'n31dorsk',
        database: 'matrix',
        port: 3306
    });

    socket.on('requestAccess', function(s) {
        var query = connection.query('SELECT * FROM acesslevel WHERE acesslevel="All"');
        var r = '';
        query
            .on('error', function(err) {
                // Handle error, and 'end' event will be emitted after this as well
                console.log(err);
            })
            .on('result', function(result) {
                // it fills our array looping on each user row inside the db
                r = result;
            })
            .on('end', function() {
                // loop on itself only if there are sockets still connected

                socket.emit('sendAccess', {
                    level: r.acesslevel,
                    access: r.content,
                    receiver: s.receiver
                });
            });
    })
    socket.on('disconnect', function() {
        var socketIndex = connectionsArray.indexOf(socket);
        console.log('socketID = %s got disconnected', socketIndex);
        if (~socketIndex) {
            connectionsArray.splice(socketIndex, 1);
        }
    });
};
