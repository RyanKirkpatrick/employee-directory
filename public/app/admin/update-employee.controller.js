(function () {
	'use strict';
	angular.module('app').controller('edUpdateEmployeeCtrl', edUpdateEmployeeCtrl);

	edUpdateEmployeeCtrl.$inject = ['edNotifierService', 'edEmployeeService'];

	function edUpdateEmployeeCtrl(edNotifierService, edEmployeeService) {
		var vm = this;
		vm.updateEmployee = updateEmployee;
		vm.fname = '';
		vm.lname = '';
		vm.gender = '';

		vm.genderOptions = [
			{
				value: 'male',
				text: 'Male'
			},
			{
				value: 'female',
				text: 'Female'
			}
		];

		edEmployeeService.setSelectMultipleEmployees(false);

		function updateEmployee() {
			var newEmployeeData = {
				firstName: vm.fname,
				lastName: vm.lname,
				gender: vm.gender
			};

			edEmployeeService.updateEmployee(newEmployeeData).then(function () {
				edNotifierService.notify('Employee information updated!');
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();