(function () {
	'use strict';
	angular.module('app').controller('edUpdateEmployeeCtrl', edUpdateEmployeeCtrl);

	edUpdateEmployeeCtrl.$inject = ['$rootScope', 'edNotifierService', 'edEmployeeService'];

	function edUpdateEmployeeCtrl($rootScope, edNotifierService, edEmployeeService) {
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

		activate();

		function activate() {
			var selectedEmployees = edEmployeeService.setSelectMultipleEmployees(false);
			if (selectedEmployees.length === 1) {
				populateEmployee(selectedEmployees);
			}
		}

		function populateEmployee(selectedEmployees) {
			vm.fname = selectedEmployees[0].name.firstName;
			vm.lname = selectedEmployees[0].name.lastName;
			vm.gender = selectedEmployees[0].gender;
		}

		function clearForm() {
			vm.fname = '';
			vm.lname = '';
			vm.gender = '';
		}

		$rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			if (selectedEmployees.length === 1) {
				populateEmployee(selectedEmployees);
			}
		});

		function updateEmployee() {
			var newEmployeeData = {
				name: {
					firstName: vm.fname,
					lastName: vm.lname
				},
				gender: vm.gender
			};

			edEmployeeService.updateEmployee(newEmployeeData).then(function () {
				edNotifierService.notify('Employee information updated!');
				clearForm();
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();