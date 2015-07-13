(function () {
  'use strict';
  angular.module('app').factory('edAuthService', edAuthService);

  edAuthService.$inject = ['$http', '$q', 'edIdentityService', 'UserResource'];

  function edAuthService($http, $q, edIdentityService, UserResource) {
    var service = {
      authenticateUser: authenticateUser,
      logoutUser: logoutUser
    };
    return service;

    function authenticateUser(username, password) {
      var dfd = $q.defer();
      $http.post('/login', {
        username: username,
        password: password
      }).then(function (response) {
        if (response.data.success) {
          var user = new UserResource();
          angular.extend(user, response.data.user);
          edIdentityService.currentUser = user;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
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
  }
})();
