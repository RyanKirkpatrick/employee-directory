(function () {
  'use strict';
  angular.module('app').config(configure);

  configure.$inject = ['$routeProvider', '$locationProvider'];

  function configure($routeProvider, $locationProvider) {
    var routeRoleChecks = {
      admin: requireAdmin,
      user: requireAuth
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
      .when('/admin/create-user', {
        templateUrl: '/partials/admin/create-user',
        controller: 'edCreateUserCtrl',
        controllerAs: 'vm',
        resolve: {
          auth: routeRoleChecks.admin
        }
      })
      .when('/admin/update-user', {
        templateUrl: '/partials/admin/update-user',
        controller: 'edUpdateUserCtrl',
        controllerAs: 'vm',
        resolve: {
          auth: routeRoleChecks.user
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

  requireAuth.$inject = ['edAuthService'];

  function requireAuth(edAuthService) {
    return edAuthService.authorizeAuthenticatedUserForRoute();
  }
})();
