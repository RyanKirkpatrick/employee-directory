(function () {
  'use strict';
  angular.module('app').controller('edLoginCtrl', edLoginCtrl);

  edLoginCtrl.$inject = ['$http', '$location', 'edIdentityService', 'edNotifierService', 'edAuthService'];

  function edLoginCtrl($http, $location, edIdentityService, edNotifierService, edAuthService) {
    var vm = this;
    vm.identity = edIdentityService;
    vm.signin = signin;
    vm.signout = signout;

    function signin(username, password) {
      edAuthService.authenticateUser(username, password).then(function (success) {
        console.log(success);
        if (success) {
          edNotifierService.notify('You have successfully signed in!');
        } else {
          edNotifierService.notify('Username / Password combination incorrect');
        }
      });
    }

    function signout() {
      edAuthService.logoutUser().then(function () {
        vm.username = '';
        vm.password = '';
        edNotifierService.notify('You have successfully signed out');
        //$location.path('/');
      });
    }
  }
})();
