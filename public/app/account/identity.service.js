(function () {
  'use strict';
  angular.module('app').factory('edIdentityService', edIdentityService);

  edIdentityService.$inject = ['$window', 'edUserResourceService'];

  function edIdentityService($window, edUserResourceService) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
      currentUser = new edUserResourceService();
      angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    var service = {
      currentUser: currentUser,
      isAuthenticated: isAuthenticated,
      isAuthorized: isAuthorized
    };
    return service;

    function isAuthenticated() {
      return !!this.currentUser;
    }

    function isAuthorized(role) {
      return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
    }
  }
})();
