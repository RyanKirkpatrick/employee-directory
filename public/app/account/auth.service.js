(function () {
  'use strict';
  angular.module('app').factory('edAuthService', edAuthService);

  edAuthService.$inject = ['$http', '$q', 'edIdentityService', 'edUserResourceService'];

  function edAuthService($http, $q, edIdentityService, edUserResourceService) {
    var service = {
      authenticateUser: authenticateUser,
      createUser: createUser,
      logoutUser: logoutUser,
      authorizeCurrentUserForRoute: authorizeCurrentUserForRoute
    };
    return service;

    function authenticateUser(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {
        username: username,
        password: password
      }).then(function (response) {
        if (response.data.success) {
          var user = new edUserResourceService();
          angular.extend(user, response.data.user);
          edIdentityService.currentUser = user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    }

    function createUser(newUserData) {
      var newUser = new edUserResourceService(newUserData);
      var dfd = $q.defer();

      newUser.$save().then(function () {
        dfd.resolve();
      }, function (response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    }

    function logoutUser() {
      var dfd = $q.defer();
      $http.post('/logout', {
        logout: true
      }).then(function () {
        edIdentityService.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    }

    function authorizeCurrentUserForRoute(role) {
      if (edIdentityService.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    }
  }
})();
