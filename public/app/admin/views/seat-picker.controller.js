(function () {
	'use strict';
	angular.module('app').controller('edSeatPickerCtrl', edSeatPickerCtrl);

	edSeatPickerCtrl.$inject = ['$scope', 'edEmployeeService', 'edEmployeeAdminService', 'edNotifierService', 'edSidebarService'];

	function edSeatPickerCtrl($scope, edEmployeeService, edEmployeeAdminService, edNotifierService, edSidebarService) {
		var vm = this;
		vm.selectedEmployee = edEmployeeService.setSelectMultipleEmployees(false)[0];
		vm.setRemoteEmployee = setRemoteEmployee;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(false);
			edEmployeeService.setDisplayEmployeeInfoType('profile');
			edEmployeeService.updateMappedEmployee(null);
		}

		var deregisterEmployee = $scope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			vm.selectedEmployee = selectedEmployees[0];
		});

		$scope.$on('$destroy', deregisterEmployee);

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