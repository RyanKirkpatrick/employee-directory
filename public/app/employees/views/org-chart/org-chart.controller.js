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
				getManager();
				getDirectReports();
			}
		}

		function getManager() {
			vm.manager = _.findWhere(employees, {'eid': vm.selectedEmployee.mid});
		}

		function getDirectReports() {
			vm.directReports = _.filter(employees, {'mid': vm.selectedEmployee.eid});
		}

		function selectEmployee(employee) {
			edEmployeeService.updateSelectedEmployees(employee);
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