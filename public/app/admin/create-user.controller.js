(function () {
  'use strict';
  angular.module('app').controller('edCreateUserCtrl', edCreateUserCtrl);

  edCreateUserCtrl.$inject = ['$location', 'edUserResourceService', 'edNotifierService', 'edAuthService'];

  function edCreateUserCtrl($location, edUserResourceService, edNotifierService, edAuthService) {
    var vm = this;
    vm.createUser = createUser;

    function createUser() {
      var newUserData = {
        username: vm.username,
        password: vm.password,
        firstName: vm.fname,
        lastName: vm.lname
      };

      edAuthService.createUser(newUserData).then(function () {
        edNotifierService.notify('User account created!');
        $location.path('/admin/login');
      }, function (reason) {
        edNotifierService.error(reason);
      });
    }
  }
})();
