(function () {
	'use strict';
	angular.module('app').controller('edUpdateEmployeeCtrl', edUpdateEmployeeCtrl);

	edUpdateEmployeeCtrl.$inject = ['$scope', 'edNotifierService', 'edEmployeeService', 'edDeskService', 'edEmployeeAdminService', '_'];

	function edUpdateEmployeeCtrl($scope, edNotifierService, edEmployeeService, edDeskService, edEmployeeAdminService, _) {
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
			if (vm.managers && selectedEmployee) {
				vm.filteredManagers = _.filter(vm.managers, function (manager) {
					// TODO: Recursively filter out direct reports of direct reports
					return (selectedEmployee.eid !== manager.eid) && (selectedEmployee.eid !== manager.mid);
				});
			}
		}

		function createManagerList(employees) {
			vm.managers = _.filter(employees, function (employee) {
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
					newEmployeeData.image = employee.eid + '.' + imageFile.name.split('.').pop().toLowerCase();
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
		 * Makes all direct reports of the deleted employee direct reports of the employee's manager
		 */
		function deleteEmployee() {
			// Save employee to delete for later
			var deletedEmployee = edEmployeeService.getSelectedEmployees()[0];
			// Find all employees that report to this employee and make them report to the next level up
			edEmployeeService.getAllEmployees().$promise.then(
				function (employees) {
					var eid = deletedEmployee.eid;
					var mid = deletedEmployee.mid;
					var directReports = _.filter(employees, {'mid': eid});
					_.forEach(directReports, function (directReport) {
						edEmployeeService.removeAllSelectedEmployees();
						vm.selectedEmployee = edEmployeeService.updateSelectedEmployees(directReport);
						edEmployeeAdminService.updateEmployee({mid: mid});
					});
				}
			);

			// Now delete the employee that was requested to be deleted
			edEmployeeService.removeAllSelectedEmployees();
			edEmployeeService.updateSelectedEmployees(deletedEmployee);

			edEmployeeAdminService.updateEmployee({deleted: true}).then(function (employee) {
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