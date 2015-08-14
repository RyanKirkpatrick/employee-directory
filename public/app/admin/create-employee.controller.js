(function () {
	'use strict';
	angular.module('app').controller('edCreateEmployeeCtrl', edCreateEmployeeCtrl);

	edCreateEmployeeCtrl.$inject = ['edNotifierService', 'edEmployeeService'];

	function edCreateEmployeeCtrl(edNotifierService, edEmployeeService) {
		var vm = this;
		vm.createEmployee = createEmployee;
		vm.newEmployee = {};
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
			resetForm();
		}

		function resetForm() {
			vm.newEmployee = {
				name: {
					firstName: '',
					lastName: ''
				},
				image: '',
				gender: '',
				title: '',
				department: '',
				team: '',
				deskLoc: {
					floor: '',
					pos: ''
				}
			};
		}

		function createEmployee() {
			var newEmployeeData = {
				name: {
					firstName: vm.newEmployee.name.firstName,
					lastName: vm.newEmployee.name.lastName
				},
				gender: vm.newEmployee.gender,
				title: vm.newEmployee.title,
				department: vm.newEmployee.department,
				team: vm.newEmployee.team,
				deskLoc: {
					floor: vm.newEmployee.deskLoc.floor,
					pos: vm.newEmployee.deskLoc.pos
				}
			};

			edEmployeeService.createEmployee(newEmployeeData).then(function (employee) {
				edNotifierService.notify('New Employee Added!');
				// upload the employee photo if there is one
				if (vm.newEmployee.image) {
					edEmployeeService.uploadEmployeePhoto(vm.newEmployee.image, employee);
					edEmployeeService.updateSelectedEmployees(employee);
					newEmployeeData.image = employee._id + '.' + vm.newEmployee.image.name.split('.').pop();
					edEmployeeService.updateEmployee(newEmployeeData);
				}
				resetForm();
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();
