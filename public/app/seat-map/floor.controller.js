(function () {
	'use strict';
	angular.module('app').controller('edFloorCtrl', edFloorCtrl);

	edFloorCtrl.$inject = ['edEmployeeService', 'edDeskService', '$state', '$scope', '$rootScope'];

	function edFloorCtrl(edEmployeeService, edDeskService, $state, $scope, $rootScope) {
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
				if (selectedEmployees[0].deskLoc) {
					$state.go('main.seat-map.floor-' + selectedEmployees[0].deskLoc.floor, {'seat': selectedEmployees[0].deskLoc.seat});
				} else {
					$state.go('main.seat-map');
				}
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
