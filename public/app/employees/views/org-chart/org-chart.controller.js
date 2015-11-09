(function () {
	'use strict';
	angular.module('app').controller('edOrgChartCtrl', edOrgChartCtrl);

	edOrgChartCtrl.$inject = ['$scope', '$state', '$stateParams', 'edEmployeeService', '_'];

	function edOrgChartCtrl($scope, $state, $stateParams, edEmployeeService, _) {
		var employees = edEmployeeService.getAllEmployees();
		var vm = this;
		vm.selectedEmployee = edEmployeeService.getSelectedEmployees()[0];
		vm.manager = null;
		vm.directReports = [];
		vm.selectEmployee = selectEmployee;
		vm.profileEmployee = profileEmployee;

		activate();

		function activate() {
			edEmployeeService.setDisplayEmployeeInfoType('profile');
			edEmployeeService.setSelectMultipleEmployees(false);
			edEmployeeService.updateMappedEmployee(null);
			if ($stateParams.employee) {
				edEmployeeService.getAllEmployees().$promise.then(getEmployeeById);
			} else if (vm.selectedEmployee) {
				setDisplayName(vm.selectedEmployee);
				getManager();
				getDirectReports();
			}
		}

		function getEmployeeById(employees) {
			var employee = _.findWhere(employees, {'eid': parseInt($stateParams.employee)});
			if (employee) {
				if (employee !== vm.selectedEmployee) {
					selectEmployee(employee);
				}
				setDisplayName(vm.selectedEmployee);
				getManager();
				getDirectReports();
			}
		}

		function getManager() {
			vm.manager = _.findWhere(employees, {'eid': vm.selectedEmployee.mid});
			if (vm.manager) {
				setDisplayName(vm.manager);
			}
		}

		function getDirectReports() {
			vm.directReports = _.filter(employees, {'mid': vm.selectedEmployee.eid});
			_.forEach(vm.directReports, function (directReport) {
				setDisplayName(directReport);
			});
		}

		function setDisplayName(employee) {
			if (employee.nickname) {
				employee.displayName = employee.nickname + ' ' + employee.lastName;
			} else {
				employee.displayName = employee.firstName + ' ' + employee.lastName;
			}
		}

		function selectEmployee(employee) {
			edEmployeeService.updateSelectedEmployees(employee);
			setDisplayName(employee);
		}

		function profileEmployee() {
			$state.go('employees');
		}

		var deregister = $scope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			vm.selectedEmployee = selectedEmployees[0];

			if (vm.selectedEmployee) {
				$state.go('employees.org-chart', {'employee': vm.selectedEmployee.eid});
			}
		});

		$scope.$on('$destroy', deregister);
	}
})();