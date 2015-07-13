(function () {
  'use strict';
  angular.module('app').config(configure);

  configure.$inject = ['$routeProvider', '$locationProvider'];

  function configure($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        templateUrl: '/partials/main/main',
        controller: 'edMainCtrl',
        controllerAs: 'vm'
      })
      .when('/seat-map/:pos?', {
        templateUrl: '/partials/seat-map/seat-map',
        controller: 'edSeatMapCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/partials/account/login',
        controller: 'edLoginCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo:'/'});
  }
})();
