(function () {
	'use strict';
	angular.module('app').controller('edMainCtrl', edMainCtrl);

	edMainCtrl.$inject = ['$scope', '$document', 'edEmployeeService', '$stateParams'];

	function edMainCtrl($scope, $document, edEmployeeService, $stateParams) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.getSelectedEmployees();
		vm.changePage = changePage;
		vm.currentPage = edEmployeeService.getProfilePageNumber();

		edEmployeeService.setDisplayEmployeeInfoType('profile');
		edEmployeeService.setSelectMultipleEmployees(true);
		edEmployeeService.updateMappedEmployee(null);

		if ($stateParams.firstname || $stateParams.lastname) {
			edEmployeeService.getAllEmployees().$promise.then(selectEmployee);
		}

		function selectEmployee(employees) {
			var selectedEmployees = employees.filter(function (employee) {
				var match = false;
				if ($stateParams.firstname) {
					// Split first name query on comma
					var firstnames = $stateParams.firstname.split(',');
					// Loop over each first name
					angular.forEach(firstnames, function (firstname) {
						// If the employee's first name is part of the query check the last names
						if (employee.firstName.toLocaleLowerCase() === firstname.toLowerCase()) {
							// If last names are on the query string
							if ($stateParams.lastname) {
								// Split last name query on comma
								var lastnames = $stateParams.lastname.split(',');
								// Loop over all the last names
								angular.forEach(lastnames, function (lastname) {
									// If the employee's last name is part of the query string we have match
									if (employee.lastName.toLocaleLowerCase() === lastname.toLowerCase()) {
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
						if (employee.lastName.toLocaleLowerCase() === lastname.toLowerCase()) {
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