(function () {
	'use strict';
	angular.module('app').controller('edSeatPickerFloorCtrl', edSeatPickerFloorCtrl);

	edSeatPickerFloorCtrl.$inject = ['edEmployeeService', 'edDeskService', '$state', '$scope', 'edSidebarService', '_'];

	function edSeatPickerFloorCtrl(edEmployeeService, edDeskService, $state, $scope, edSidebarService, _) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(false);
		vm.desks = null;
		vm.location = null;
		vm.floor = null;

		edEmployeeService.setDisplayEmployeeInfoType('profile');

		activate();

		function activate() {
			edSidebarService.setLockSidebar(false);
			checkForSelectedEmployee(vm.selectedEmployees);
			// Get the floor based on the current state
			var currentState = $state.current.name;
			var locationAndFloor = currentState.split('.')[2].split('-');
			vm.location = locationAndFloor[0];
			vm.floor = parseInt(locationAndFloor[1]);

			if (vm.location === 'buf') {
				vm.locationName = 'BUF';
			} else if (vm.location === 'nyc') {
				vm.locationName = 'NYC';
			} else {
				vm.locationName = 'Remote';
			}

			// Map all the desks on this floor
			edDeskService.getAllDesks().$promise.then(deskFilter);
		}

		var deregisterEmployee = $scope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			checkForSelectedEmployee(selectedEmployees);
		});

		$scope.$on('$destroy', deregisterEmployee);

		function deskFilter(desks) {
			vm.desks = _.filter(desks, function (desk) {
				return desk.floor === vm.floor && desk.location === vm.location;
			});
		}

		function checkForSelectedEmployee(selectedEmployees) {
			if (selectedEmployees.length !== 1) {
				$state.go('admin.seat-picker');
			}
		}
	}
})();