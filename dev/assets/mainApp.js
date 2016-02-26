(function() {
    'use strict';

    angular.module('app', ['ngMaterial']);
    angular.module('main.services', ['app']);
    angular.module('main.ctrls', ['main.services']);
    angular.module('main.diretives', ['main.ctrls']);

})();
