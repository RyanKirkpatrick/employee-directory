(function () {
  'use strict';
  angular.module('app').controller('edSeatMapCtrl', edSeatMapCtrl);

  edSeatMapCtrl.$inject = ['edEmployeeService', 'edDeskService', '$routeParams', '$rootScope', '$location'];

  function edSeatMapCtrl(edEmployeeService, edDeskService, $routeParams, $rootScope, $location) {
    var vm = this;
    vm.selectedEmployees = edEmployeeService.getSelectedEmployees();
    vm.desks = edDeskService.getAllDesks();

    edEmployeeService.setSelectMultipleEmployees(false);

    if (!$routeParams.pos) {
      edEmployeeService.removeAllSelectedEmployees();
    } else if (vm.selectedEmployees < 1) {
      $location.path('/seat-map');
    }
  }
})();
