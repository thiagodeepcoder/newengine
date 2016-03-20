(function() {
    angular
        .module('main.ctrls')
        .controller('DashboardController', [
            '$scope', 'socket',
            function($scope, socket) {
                console.log("dashboard initiated");
                var m = new Date();
                var daysToShow;
                $scope.daysview = "month";
                this.states = ('label everdom').split(' ').map(function(state) {
                    return {
                        abbrev: state
                    };
                });
                $scope.labels = [];
                $scope.data = [
                    [1201, 1219, 1236, 1249, 1257, 1268],
                    [373, 382, 403, 414, 427, 433]
                ];

                function init() {

                    getNewData();
                    socket.on('sendData', function(result) {
                        $scope.data = [];
                        var eArray = [];
                        var lArray = [];
                        console.log(result);
                        result.forEach(function(key, index) {

                            if (key.user == "everdom") {
                                eArray.push(key.followers);
                                    $scope.labels.push(new Date(key.reg_date).getDate() + "/" + (new Date(key.reg_date).getMonth()+1));
                                    //console.log(new Date(key.reg_date).getDate() + "/" + (new Date(key.reg_date).getMonth()+1));
                            }
                            if (key.user == "label") {
                                lArray.push(key.followers);
                            }
                        })

                        $scope.data.push(eArray);
                        $scope.data.push(lArray);



                    })
                    if ($scope.daysview === "week") {
                        daysToShow = 7;

                    } else if ($scope.daysview === "month") {
                        daysToShow = 30;
                    }

                }


                function getNewData() {
                    socket.emit("requestData", {});

                }
                $scope.series = ['Everdom', 'Urban Addict'];

                $scope.onClick = function(points, evt) {
                    console.log(points, evt);
                };

                $scope.colours = [{ // red
                    fillColor: 'rgba(247,70,74,0.2)',
                    strokeColor: 'rgba(247,70,74,1)',
                    pointColor: 'rgba(247,70,74,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(247,70,74,0.8)'
                }, { // green
                    fillColor: 'rgba(70,191,189,0.2)',
                    strokeColor: 'rgba(70,191,189,1)',
                    pointColor: 'rgba(70,191,189,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(70,191,189,0.8)'
                }];


                init();




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
