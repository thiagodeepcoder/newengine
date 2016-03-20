var connectionsArray = [];

// export function for listening to the socket
module.exports = function(socket) {
    connectionsArray.push(socket);
    console.log('Number of connections:' + connectionsArray.length);
    var mysql = require('mysql');

    var mysqlConnection = mysql.createConnection({
        host: '192.185.223.164',
        user: 'binbou_ex',
        password: 'enileuqaj1',

    });

    mysqlConnection.connect(function(err) {
        if (!err) {
            console.log("Connected to MySQL");

        } else if (err) {
            console.log(err);
        }
    });


    socket.on('requestData', function() {
        var s = "SELECT * FROM binbou_sc.summary;";
        var q = mysqlConnection.query(s);

        var result = [];

        q
            .on('error', function(err) {
                // Handle error, and 'end' event will be emitted after this as well
                console.log(err);
            })
            .on('result', function(camp) {
                // it fills our array looping on each user row inside the db
                result.push(camp);
            })
            .on('end', function() {
                console.log(result);
                // loop on itself only if there are sockets still connected
                socket.emit('sendData', result);
            });
    });

    // mysql://b44e9de9371847:881e34d2@us-cdbr-iron-east-03.cleardb.net/heroku_b8e3d9d12cabdaa?reconnect=true
    socket.on('disconnect', function() {
        var socketIndex = connectionsArray.indexOf(socket);
        console.log('socketID = %s got disconnected', socketIndex);
        if (~socketIndex) {
            connectionsArray.splice(socketIndex, 1);
        }
    });
};
