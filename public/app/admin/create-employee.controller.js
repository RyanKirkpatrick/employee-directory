(function () {
	'use strict';
	angular.module('app').controller('edCreateEmployeeCtrl', edCreateEmployeeCtrl);

	edCreateEmployeeCtrl.$inject = ['edNotifierService', 'edEmployeeService', 'edDeskService'];

	function edCreateEmployeeCtrl(edNotifierService, edEmployeeService, edDeskService) {
		var vm = this;
		vm.createEmployee = createEmployee;
		vm.desks = edDeskService.getAllDesks();
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
				gender: '',
				title: '',
				department: '',
				team: '',
				deskLoc: {
					floor: '',
					seat: ''
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
					seat: vm.newEmployee.deskLoc.seat
				}
			};

			edEmployeeService.createEmployee(newEmployeeData).then(function (employee) {
				edNotifierService.notify('New Employee Added!');
				// upload the employee photo if there is one
				if (vm.newEmployee.image) {
					edEmployeeService.uploadEmployeePhoto(vm.newEmployee.image, employee);
					// Now update the employee record in the DB with the correct filename
					// update the selected employee to add so we can update them
					edEmployeeService.updateSelectedEmployees(employee);
					newEmployeeData.image = employee._id + '.' + vm.newEmployee.image.name.split('.').pop().toLowerCase();
					edEmployeeService.updateEmployee(newEmployeeData).then(function (employee) {
						//photo upload successful
					}, function () {
						edNotifierService.error('Employee Photo Not Added.');
					});
				}
				resetForm();
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();
