(function () {
  'use strict';
  angular.module('app').factory('edIdentityService', edIdentityService);

  edIdentityService.$inject = ['$window', 'UserResource'];

  function edIdentityService($window, UserResource) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
      currentUser = new UserResource();
      angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    var service = {
      currentUser: currentUser,
      isAuthenticated: isAuthenticated
    };
    return service;

    function isAuthenticated() {
      return !!this.currentUser;
    }
  }
})();
