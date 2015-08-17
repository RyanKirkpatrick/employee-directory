(function () {
	'use strict';
	angular.module('app').controller('edSeatMapFloorCtrl', edSeatMapFloorCtrl);

	edSeatMapFloorCtrl.$inject = ['edEmployeeService', 'edDeskService', '$state', '$scope', '$rootScope'];

	function edSeatMapFloorCtrl(edEmployeeService, edDeskService, $state, $scope, $rootScope) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(false);
		vm.desks = null;
		vm.floor = null;

		activate();

		function activate() {
			if (vm.selectedEmployees.length === 1 && vm.selectedEmployees[0].deskLoc.floor) {
				vm.floor = vm.selectedEmployees[0].deskLoc.floor;
				edDeskService.getAllDesks().$promise.then(deskFilter);
			} else {
				$state.go('main');
			}
		}

		var deregister = $rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			if (selectedEmployees.length === 1) {
				$state.go('seat-map.floor-' + selectedEmployees[0].deskLoc.floor, {'pos': selectedEmployees[0].deskLoc.pos});
			}
		});

		$scope.$on('$destroy', deregister);

		function deskFilter(desks) {
			vm.desks = desks.filter(function (desk) {
				return desk.floor === vm.floor;
			});
		}
	}
})();
