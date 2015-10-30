(function () {
	'use strict';
	angular.module('app').controller('edUpdateEmployeeCtrl', edUpdateEmployeeCtrl);

	edUpdateEmployeeCtrl.$inject = ['$scope', 'edNotifierService', 'edEmployeeService', 'edDeskService', 'edEmployeeAdminService'];

	function edUpdateEmployeeCtrl($scope, edNotifierService, edEmployeeService, edDeskService, edEmployeeAdminService) {
		var vm = this;
		vm.updateEmployee = updateEmployee;
		vm.deleteEmployee = deleteEmployee;
		vm.cancelUpdateEmployee = cancelUpdateEmployee;
		vm.desks = edDeskService.getAllDesks();
		vm.selectedEmployee = null;
		vm.managers = null;
		vm.filteredManagers = [];
		vm.locationOptions = [
			{
				value: 'buf',
				text: 'Buffalo'
			},
			{
				value: 'nyc',
				text: 'NYC'
			},
			{
				value: 'oth',
				text: 'Remote'
			}
		];

		activate();

		function activate() {
			edEmployeeService.setDisplayEmployeeInfoType('profile');
			edEmployeeService.getAllEmployees().$promise.then(createManagerList);
			var selectedEmployees = edEmployeeService.setSelectMultipleEmployees(false);
			if (selectedEmployees.length === 1) {
				populateEmployee(selectedEmployees);
			}
		}

		function populateEmployee(selectedEmployees) {
			vm.selectedEmployee = {
				eid: selectedEmployees[0].eid,
				firstName: selectedEmployees[0].firstName,
				lastName: selectedEmployees[0].lastName,
				nickname: selectedEmployees[0].nickname,
				email: selectedEmployees[0].email,
				phone: selectedEmployees[0].phone,
				ext: selectedEmployees[0].ext,
				title: selectedEmployees[0].title,
				department: selectedEmployees[0].department,
				team: selectedEmployees[0].team,
				location: selectedEmployees[0].location,
				floor: selectedEmployees[0].floor,
				seat: selectedEmployees[0].seat,
				hasReports: selectedEmployees[0].hasReports,
				mid: selectedEmployees[0].mid
			};
			filterManagers(selectedEmployees[0]);
		}

		/**
		 * Filter out the selected employee and their direct reports from the managers list
		 *
		 * @param {Object} selectedEmployee employee data for selected employee
		 * @return {Boolean} to include this manager in the list
		 */
		function filterManagers(selectedEmployee) {
			if (vm.managers) {
				vm.filteredManagers = vm.managers.filter(function (manager) {
					// TODO: Recursively filter out direct reports of direct reports
					return (selectedEmployee.eid !== manager.eid) && (selectedEmployee.eid !== manager.mid);
				});
			}
		}

		function createManagerList(employees) {
			vm.managers = employees.filter(function (employee) {
				return employee.hasReports === true;
			});
			filterManagers(vm.selectedEmployee);
		}

		var selectedEmployeeChangeEvent = $scope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			if (selectedEmployees.length === 1) {
				populateEmployee(selectedEmployees);
			} else {
				vm.selectedEmployee = null;
			}
		});

		$scope.$on('$destroy', selectedEmployeeChangeEvent);

		var employeesUpdatedEvent = $scope.$on('employeesUpdated', function () {
			edEmployeeService.getAllEmployees().$promise.then(createManagerList);
		});

		$scope.$on('$destroy', employeesUpdatedEvent);

		function updateEmployee() {
			// Get the employee data from the form
			var newEmployeeData = {
				eid: vm.selectedEmployee.eid,
				firstName: vm.selectedEmployee.firstName,
				lastName: vm.selectedEmployee.lastName,
				nickname: vm.selectedEmployee.nickname,
				email: vm.selectedEmployee.email,
				phone: vm.selectedEmployee.phone,
				ext: vm.selectedEmployee.ext,
				title: vm.selectedEmployee.title,
				department: vm.selectedEmployee.department,
				team: vm.selectedEmployee.team,
				location: vm.selectedEmployee.location,
				floor: vm.selectedEmployee.floor,
				seat: vm.selectedEmployee.seat,
				hasReports: vm.selectedEmployee.hasReports,
				mid: vm.selectedEmployee.mid
			};

			// Save the image file for uploading
			var imageFile = vm.selectedEmployee.imageFile;

			edEmployeeAdminService.updateEmployee(newEmployeeData).then(function (employee) {
				edNotifierService.notify('Employee information updated!');
				if (imageFile) {
					// upload the file to the file system
					edEmployeeAdminService.uploadEmployeePhoto(imageFile, employee);
					// Now update the employee record in the DB with the correct filename
					edEmployeeService.updateSelectedEmployees(employee);
					newEmployeeData.image = employee._id + '.' + imageFile.name.split('.').pop().toLowerCase();
					edEmployeeAdminService.updateEmployee(newEmployeeData).then(function (employee) {
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

			edEmployeeAdminService.updateEmployee(newEmployeeData).then(function (employee) {
				edNotifierService.notify(employee.firstName + ' ' + employee.lastName + ' deleted!');
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}

		function cancelUpdateEmployee() {
			edEmployeeService.removeAllSelectedEmployees();
		}
	}
})();