(function () {
	'use strict';
	angular.module('app').controller('edSeatMapCtrl', edSeatMapCtrl);

	edSeatMapCtrl.$inject = ['edEmployeeService', 'edDeskService', '$state', '$stateParams'];

	function edSeatMapCtrl(edEmployeeService, edDeskService, $state, $stateParams) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(false);
		vm.desks = edDeskService.getAllDesks();

		if (vm.selectedEmployees.length === 1 && $stateParams.pos === '') {
			$state.go('seat-map', {'pos': vm.selectedEmployees[0].deskLoc.pos});
		}
	}
})();
