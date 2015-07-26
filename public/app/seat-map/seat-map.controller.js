(function () {
	'use strict';
	angular.module('app').controller('edSeatMapCtrl', edSeatMapCtrl);

	edSeatMapCtrl.$inject = ['edEmployeeService', 'edDeskService', '$routeParams', '$rootScope', '$location'];

	function edSeatMapCtrl(edEmployeeService, edDeskService, $routeParams, $rootScope, $location) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(false);
		vm.desks = edDeskService.getAllDesks();

		if (vm.selectedEmployees.length === 1) {
			$routeParams.pos = vm.selectedEmployees[0].deskLoc.pos;
		}
	}
})();
