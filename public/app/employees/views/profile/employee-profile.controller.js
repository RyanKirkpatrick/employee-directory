(function () {
	'use strict';
	angular.module('app').controller('edEmployeeProfileCtrl', edEmployeeProfileCtrl);

	edEmployeeProfileCtrl.$inject = ['$scope', '$document', 'edEmployeeService', '$stateParams', '_'];

	function edEmployeeProfileCtrl($scope, $document, edEmployeeService, $stateParams, _) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.getSelectedEmployees();
		vm.changePage = changePage;
		vm.currentPage = edEmployeeService.getProfilePageNumber();

		edEmployeeService.setDisplayEmployeeInfoType('profile');
		edEmployeeService.setSelectMultipleEmployees(true);
		edEmployeeService.updateMappedEmployee(null);

		activate();

		function activate() {
			if ($stateParams.employeeid || $stateParams.team || $stateParams.department || $stateParams.firstname || $stateParams.lastname) {
				edEmployeeService.removeAllSelectedEmployees();
				edEmployeeService.getAllEmployees().$promise.then(function (employees) {
					if ($stateParams.employeeid) {
						selectEmployeeById(employees);
					} else if ($stateParams.team) {
						selectEmployeeByTeam(employees);
					} else if ($stateParams.department) {
						selectEmployeeByDepartment(employees);
					} else if ($stateParams.firstname || $stateParams.lastname) {
						selectEmployeeByName(employees);
					}
				});
			}
		}

		function selectEmployeeById(employees) {
			var selectedEmployees = _.filter(employees, function (employee) {
				var match = false;
				if ($stateParams.employeeid) {
					// Split eid query on comma
					var employeeids = $stateParams.employeeid.split(',');
					angular.forEach(employeeids, function (eid) {
						// If the employee's id is part of the query
						if (employee.hasOwnProperty('eid') && employee.eid === parseInt(eid)) {
							match = true;
						} else {
							return false;
						}
					});
					return match;
				}
			});

			angular.forEach(selectedEmployees, function (employee) {
				edEmployeeService.updateSelectedEmployees(employee);
			});
		}

		function selectEmployeeByTeam(employees) {
			var selectedEmployees = _.filter(employees, function (employee) {
				var match = false;
				if ($stateParams.team) {
					// Split teams query on comma
					var teams = $stateParams.team.split(',');
					angular.forEach(teams, function (team) {
						// If the employee's team is part of the query
						if (employee.hasOwnProperty('team') && employee.team.toLowerCase() === team.toLowerCase()) {
							match = true;
						} else {
							return false;
						}
					});
					return match;
				}
			});

			angular.forEach(selectedEmployees, function (employee) {
				edEmployeeService.updateSelectedEmployees(employee);
			});
		}

		function selectEmployeeByDepartment(employees) {
			var selectedEmployees = _.filter(employees, function (employee) {
				var match = false;
				if ($stateParams.department) {
					// Split departments query on comma
					var departments = $stateParams.department.split(',');
					angular.forEach(departments, function (department) {
						// If the employee's team is part of the query
						if (employee.hasOwnProperty('department') && employee.department.toLowerCase() === department.toLowerCase()) {
							match = true;
						} else {
							return false;
						}
					});
					return match;
				}
			});

			angular.forEach(selectedEmployees, function (employee) {
				edEmployeeService.updateSelectedEmployees(employee);
			});
		}

		function selectEmployeeByName(employees) {
			var selectedEmployees = _.filter(employees, function (employee) {
				var match = false;
				if ($stateParams.firstname) {
					// Split first name query on comma
					var firstnames = $stateParams.firstname.split(',');
					// Loop over each first name
					angular.forEach(firstnames, function (firstname) {
						// If the employee's first name (or nickname) is part of the query check the last names
						if (employee.firstName.toLowerCase() === firstname.toLowerCase() ||
							(employee.hasOwnProperty('nickname') && employee.nickname.toLowerCase() === firstname.toLowerCase())) {
							// If last names are on the query string
							if ($stateParams.lastname) {
								// Split last name query on comma
								var lastnames = $stateParams.lastname.split(',');
								// Loop over all the last names
								angular.forEach(lastnames, function (lastname) {
									// If the employee's last name is part of the query string we have match
									if (employee.lastName.toLowerCase() === lastname.toLowerCase()) {
										match = true;
									} else {
										return false;
									}
								});
								// No last name query so only worry about the first name
							} else {
								match = true;
							}
							// This employee's first name is not a match
						} else {
							return false;
						}
					});
					// No first name query so only worry about the last name
				} else if ($stateParams.lastname) {
					var lastnames = $stateParams.lastname.split(',');
					// Loop over all the last names
					angular.forEach(lastnames, function (lastname) {
						// If the employee's last name is part of the query string we have match
						if (employee.lastName.toLowerCase() === lastname.toLowerCase()) {
							match = true;
							// This employee's last name is not a match
						} else {
							return false;
						}
					});
				}
				return match;
			});

			angular.forEach(selectedEmployees, function (employee) {
				edEmployeeService.updateSelectedEmployees(employee);
			});
		}

		function changePage(newPageNumber) {
			edEmployeeService.setProfilePageNumber(newPageNumber);
			$document.scrollTopAnimated(0, 300);
		}

		var deregister = $scope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			vm.selectedEmployees = selectedEmployees;
			// If we added to selected employees, go to first page and scroll to the top
			if (edEmployeeService.getSelectedEmployeeAdded()) {
				vm.currentPage = 1;
				$document.scrollTopAnimated(0, 300);
			}
		});

		$scope.$on('$destroy', deregister);
	}
})();