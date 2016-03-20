    'use strict';
    angular.module('mainApp', ['ngAnimate', 'main.ctrls',
            'ngSanitize', 'ui.router', 'ngMaterial', 'ngAria', 'chart.js'
        ])
        .config(routing)
        .config(theming);


    function routing($stateProvider, $urlRouterProvider) {
        console.log('config');
        $stateProvider

            .state('home', {
            url: '',
            templateUrl: './../pages/main.html',
            controller: 'MainController',
            abstract: true
        })

        .state('home.dashboard', {
            url: '/dashboard',
            controller: 'DashboardController',
            templateUrl: './../pages/dashboard.html',
            controllerAs: 'ctrl'
        })
        $urlRouterProvider.otherwise('/dashboard');
    }

    function theming($mdThemingProvider) {
        var myPalette = $mdThemingProvider.extendPalette('indigo', {
            '500': '2196f3'
        });
        $mdThemingProvider.definePalette('mine', myPalette);
        $mdThemingProvider.theme('default')
            .primaryPalette('mine').dark()
            .warnPalette('red').dark();


        $mdThemingProvider.theme('custom')
            .primaryPalette('deep-purple')
            .accentPalette('orange')
            .warnPalette('purple').dark()

        //create yr own palette 
        $mdThemingProvider.definePalette('amazingPaletteName', {
            '50': 'ffebee',
            '100': 'ffcdd2',
            '200': 'ef9a9a',
            '300': 'e57373',
            '400': 'ef5350',
            '500': 'f44336',
            '600': 'e53935',
            '700': 'd32f2f',
            '800': 'c62828',
            '900': 'b71c1c',
            'A100': 'ff8a80',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
            'contrastDefaultColor': 'light', // whether, by default, text         (contrast)
            // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
                '200', '300', '400', 'A100'
            ],
            'contrastLightColors': undefined // could also specify this if default was 'dark'
        });

        $mdThemingProvider.theme('custom2')
            .primaryPalette('amazingPaletteName')
    }
