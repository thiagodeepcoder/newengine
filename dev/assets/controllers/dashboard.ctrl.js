(function() {
    angular
        .module('main.ctrls')
        .controller('DashboardController', [
            '$scope', 'socket',
            function($scope, socket) {
                console.log("dashboard initiated");
                this.states = ('label everdom').split(' ').map(function(state) {
                    return { abbrev: state };
                });
            }
        ])
        .factory('socket', function($rootScope) {
            var socket = io.connect();
            return {
                on: function(eventName, callback) {
                    socket.on(eventName, function() {
                        var args = arguments;
                        $rootScope.$apply(function() {
                            callback.apply(socket, args);
                        });
                    });
                },
                emit: function(eventName, data, callback) {
                    socket.emit(eventName, data, function() {
                        var args = arguments;
                        $rootScope.$apply(function() {
                            if (callback) {
                                callback.apply(socket, args);
                            }
                        });
                    })
                }
            };
        })
})();
