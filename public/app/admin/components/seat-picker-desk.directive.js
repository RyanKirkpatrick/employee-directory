(function () {
	'use strict';
	angular.module('app').directive('edSeatPickerDesk', edSeatPickerDesk);

	function edSeatPickerDesk() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/admin/components/seat-picker-desk',
			replace: true,
			scope: {
				location: '@',
				floor: '@',
				seat: '@',
				orientation: '@',
				classification: '@',
				xpos: '@',
				ypos: '@'
			},
			controller: ctrlFunc,
			controllerAs: 'vm',
			bindToController: true
		};

		return directive;
	}

	ctrlFunc.$inject = ['edEmployeeAdminService', 'edNotifierService', 'edEmployeeService', '_'];

	function ctrlFunc(edEmployeeAdminService, edNotifierService, edEmployeeService, _) {
		var vm = this;
		vm.employees = edEmployeeService.getAllEmployees();
		vm.employee = null;
		vm.assignSeat = assignSeat;

		activate();

		function activate() {
			// Get all the employee names to display on the desks
			vm.employee = _.filter(vm.employees, function (employee) {
				return employee.seat === vm.seat && employee.location === vm.location;
			});
		}

		function assignSeat(location, floor, seat) {
			var newEmployeeData = {
				location: location,
				floor: floor,
				seat: seat
			};

			edEmployeeAdminService.updateEmployee(newEmployeeData).then(function () {
				edNotifierService.notify('Employee seat updated!');
			});
		}
	}
})();