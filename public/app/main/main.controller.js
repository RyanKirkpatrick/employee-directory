(function () {
  'use strict';
  angular.module('app').controller('edMainCtrl', edMainCtrl);

  edMainCtrl.$inject = ['edEmployeeService'];

  function edMainCtrl(edEmployeeService) {
    var vm = this;
    vm.selectedEmployees = edEmployeeService.getSelectedEmployees();
    edEmployeeService.setSelectMultipleEmployees(true);
  }
})();