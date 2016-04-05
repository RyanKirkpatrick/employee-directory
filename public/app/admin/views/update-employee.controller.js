(function () {
	'use strict';
	angular.module('app').controller('edUpdateEmployeeCtrl', edUpdateEmployeeCtrl);

	edUpdateEmployeeCtrl.$inject = ['$scope', 'edNotifierService', 'edEmployeeService', 'edDeskService', 'edEmployeeAdminService', 'edIdentityService', 'edSidebarService', '_', 'moment'];

	function edUpdateEmployeeCtrl($scope, edNotifierService, edEmployeeService, edDeskService, edEmployeeAdminService, edIdentityService, edSidebarService, _, moment) {
		var vm = this;
		vm.identity = edIdentityService;
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
		vm.departments = [
			'Carrier Relations',
			'Client Service',
			'Client Service Management',
			'Configuration',
			'Corporate',
			'Development',
			'Employee Services',
			'Field Sales',
			'Finance',
			'HR',
			'Implementation',
			'Infrastructure / Tech Ops',
			'Marketing',
			'Product Strategy',
			'Strategic Operational Support',
			'QA / Reporting / Billing'
		];

		activate();

		function activate() {
			edSidebarService.setLockSidebar(false);
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
				guilds: {},
				committees: {},
				location: selectedEmployees[0].location,
				floor: selectedEmployees[0].floor,
				seat: selectedEmployees[0].seat,
				hasReports: selectedEmployees[0].hasReports,
				mid: selectedEmployees[0].mid
			};

			if (selectedEmployees[0].birthdate) {
				vm.selectedEmployee.birthdate = moment(selectedEmployees[0].birthdate).format('LL');
			}

			if (selectedEmployees[0].hireDate) {
				vm.selectedEmployee.hireDate = moment(selectedEmployees[0].hireDate).format('LL');
			}

			_.forEach(selectedEmployees[0].guilds, function (guild) {
				vm.selectedEmployee.guilds[guild] = true;
			});

			_.forEach(selectedEmployees[0].committees, function (committee) {
				vm.selectedEmployee.committees[committee] = true;
			});

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

		var selectedEmployeesChangeEvent = $scope.$on('selectedEmployeesChange', function (event, selectedEmployees) {
			if (selectedEmployees.length === 1) {
				populateEmployee(selectedEmployees);
			} else {
				vm.selectedEmployee = null;
			}
		});

		$scope.$on('$destroy', selectedEmployeesChangeEvent);

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
				guilds: [],
				committees: [],
				location: vm.selectedEmployee.location,
				floor: vm.selectedEmployee.floor,
				seat: vm.selectedEmployee.seat,
				hasReports: vm.selectedEmployee.hasReports,
				mid: vm.selectedEmployee.mid,
				birthdate: vm.selectedEmployee.birthdate,
				hireDate: vm.selectedEmployee.hireDate
			};

			// Add all the selected guilds
			_.forEach(vm.selectedEmployee.guilds, function (include, guild) {
				if (include) {
					newEmployeeData.guilds.push(guild);
				}
			});

			// Add all the selected committees
			_.forEach(vm.selectedEmployee.committees, function (include, committee) {
				if (include) {
					newEmployeeData.committees.push(committee);
				}
			});

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