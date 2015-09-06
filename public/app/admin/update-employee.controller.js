(function () {
	'use strict';
	angular.module('app').controller('edUpdateEmployeeCtrl', edUpdateEmployeeCtrl);

	edUpdateEmployeeCtrl.$inject = ['$rootScope', 'edNotifierService', 'edEmployeeService', 'edDeskService'];

	function edUpdateEmployeeCtrl($rootScope, edNotifierService, edEmployeeService, edDeskService) {
		var vm = this;
		vm.updateEmployee = updateEmployee;
		vm.deleteEmployee = deleteEmployee;
		vm.cancelUpdateEmployee = cancelUpdateEmployee;
		vm.desks = edDeskService.getAllDesks();
		vm.selectedEmployee = null;
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
			vm.selectedEmployee = {
				name: {
					firstName: selectedEmployees[0].name.firstName,
					lastName: selectedEmployees[0].name.lastName
				},
				gender: selectedEmployees[0].gender,
				title: selectedEmployees[0].title,
				department: selectedEmployees[0].department,
				team: selectedEmployees[0].team
			};

			if (selectedEmployees[0].deskLoc) {
				vm.selectedEmployee.deskLoc = {
					floor: selectedEmployees[0].deskLoc.floor,
					seat: selectedEmployees[0].deskLoc.seat
				};
			}
		}

		$rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			if (selectedEmployees.length === 1) {
				populateEmployee(selectedEmployees);
			} else {
				vm.selectedEmployee = null;
			}
		});

		function updateEmployee() {
			// Get the employee data from the form
			var newEmployeeData = {
				name: {
					firstName: vm.selectedEmployee.name.firstName,
					lastName: vm.selectedEmployee.name.lastName
				},
				gender: vm.selectedEmployee.gender,
				title: vm.selectedEmployee.title,
				department: vm.selectedEmployee.department,
				team: vm.selectedEmployee.team
			};

			if (vm.selectedEmployee.deskLoc) {
				newEmployeeData.deskLoc = {
					floor: vm.selectedEmployee.deskLoc.floor,
					seat: vm.selectedEmployee.deskLoc.seat
				};
			}

			// Save the image file for uploading
			var imageFile = vm.selectedEmployee.imageFile;

			edEmployeeService.updateEmployee(newEmployeeData).then(function (employee) {
				edNotifierService.notify('Employee information updated!');
				if (imageFile) {
					// upload the file to the file system
					edEmployeeService.uploadEmployeePhoto(imageFile, employee);
					// Now update the employee record in the DB with the correct filename
					edEmployeeService.updateSelectedEmployees(employee);
					newEmployeeData.image = employee._id + '.' + imageFile.name.split('.').pop().toLowerCase();
					edEmployeeService.updateEmployee(newEmployeeData).then(function (employee) {
						//photo upload successful
					}, function () {
						edNotifierService.error('Employee Photo Not Added.');
					});
					imageFile = null;
				}
				vm.selectedEmployee = null;
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}

		/**
		 * Marks employee as deleted
		 */
		function deleteEmployee() {
			var newEmployeeData = {
				deleted: true
			};

			edEmployeeService.updateEmployee(newEmployeeData).then(function (employee) {
				edNotifierService.notify(employee.name.firstName + ' ' + employee.name.lastName + ' deleted!');
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}

		function cancelUpdateEmployee() {
			edEmployeeService.removeAllSelectedEmployees();
		}
	}
})();