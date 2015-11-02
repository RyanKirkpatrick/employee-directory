(function () {
	'use strict';
	angular.module('app').controller('edSeatPickerCtrl', edSeatPickerCtrl);

	edSeatPickerCtrl.$inject = ['$scope', 'edEmployeeService', 'edEmployeeAdminService', 'edNotifierService'];

	function edSeatPickerCtrl($scope, edEmployeeService, edEmployeeAdminService, edNotifierService) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(false);
		vm.setRemoteEmployee = setRemoteEmployee;

		edEmployeeService.setDisplayEmployeeInfoType('profile');
		edEmployeeService.updateMappedEmployee(null);

		activate();

		function activate() {
			generateDisplayName();
		}

		var deregisterEmployee = $scope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			vm.selectedEmployees = selectedEmployees;
			generateDisplayName();
		});

		$scope.$on('$destroy', deregisterEmployee);

		function generateDisplayName() {
			if (vm.selectedEmployees.length > 0) {
				if (vm.selectedEmployees[0].nickname) {
					vm.displayName = vm.selectedEmployees[0].nickname;
				} else {
					vm.displayName = vm.selectedEmployees[0].firstName;
				}
				vm.displayName += ' ' + vm.selectedEmployees[0].lastName;
			}
		}

		function setRemoteEmployee() {
			var newEmployeeData = {
				location: 'oth',
				floor: null,
				seat: ''
			};

			edEmployeeAdminService.updateEmployee(newEmployeeData).then(function () {
				edNotifierService.notify('Employee location set to remote');
			});
		}
	}
})();