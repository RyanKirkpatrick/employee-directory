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
			controllerAs: 'vm'
		};

		return directive;
	}

	ctrlFunc.$inject = ['edEmployeeAdminService', 'edNotifierService'];

	function ctrlFunc(edEmployeeAdminService, edNotifierService) {
		var vm = this;
		vm.assignSeat = assignSeat;

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