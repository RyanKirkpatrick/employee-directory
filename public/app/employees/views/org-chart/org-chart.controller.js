(function () {
	'use strict';
	angular.module('app').controller('edOrgChartCtrl', edOrgChartCtrl);

	edOrgChartCtrl.$inject = ['$scope', '$state', '$stateParams', 'edEmployeeService', 'edSidebarService', '_'];

	function edOrgChartCtrl($scope, $state, $stateParams, edEmployeeService, edSidebarService, _) {
		var employees = edEmployeeService.getAllEmployees();
		var vm = this;
		vm.selectedEmployee = edEmployeeService.getSelectedEmployees()[0];
		vm.manager = null;
		vm.directReports = [];
		vm.selectEmployee = selectEmployee;
		vm.profileEmployee = profileEmployee;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(false);
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
			vm.directReports = _.sortBy(_.filter(employees, {'mid': vm.selectedEmployee.eid}), 'lastName');
		}

		function selectEmployee(employee) {
			vm.selectedEmployee = edEmployeeService.updateSelectedEmployees(employee)[0];
		}

		function profileEmployee() {
			$state.go('employees.profile.employee', {'employee': vm.selectedEmployee.eid});
		}

		var deregister = $scope.$on('selectedEmployeesChange', function (event, selectedEmployees) {
			vm.selectedEmployee = selectedEmployees[0];

			if (vm.selectedEmployee) {
				$state.go('employees.org-chart', {'employee': vm.selectedEmployee.eid});
			}
		});

		$scope.$on('$destroy', deregister);
	}
})();