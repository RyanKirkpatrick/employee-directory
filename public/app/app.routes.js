(function () {
  'use strict';
  angular.module('app').config(configure);

  configure.$inject = ['$routeProvider', '$locationProvider'];

  function configure($routeProvider, $locationProvider) {
    var routeRoleChecks = {
      admin: requireAdmin
    };

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
      .when('/admin/users', {
        templateUrl: '/partials/admin/user-list',
        controller: 'edUserListCtrl',
        controllerAs: 'vm',
        resolve: {
          auth: routeRoleChecks.admin
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }

  requireAdmin.$inject = ['edAuthService'];

  function requireAdmin(edAuthService) {
    return edAuthService.authorizeCurrentUserForRoute('admin');
  }
})();
