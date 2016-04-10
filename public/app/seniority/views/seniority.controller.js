(function () {
	'use strict';
	angular.module('app').controller('edSeniorityCtrl', edSeniorityCtrl);

	edSeniorityCtrl.$inject = ['$state', '$stateParams', 'edSidebarService', 'edEmployeeService', '_', 'moment'];

	function edSeniorityCtrl($state, $stateParams, edSidebarService, edEmployeeService, _, moment) {
		var vm = this;
		vm.yos = null;
		vm.yosEmployees = [];
		vm.profileEmployee = profileEmployee;
		vm.years = [1, 3, 5];
		vm.requestedYos = null;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
			if ($stateParams.yos) {
				vm.requestedYos = parseInt($stateParams.yos);
				vm.nextYos = vm.years[vm.years.indexOf(vm.requestedYos) + 1];
				if (!vm.nextYos) {
					vm.nextYos = 100;
				}
				edEmployeeService.getAllEmployees().$promise.then(filterEmployeesBySeniority);
			}
		}

		function filterEmployeesBySeniority(employees) {
			vm.yosEmployees = _.sortBy(_.filter(employees, function (employee) {
				if (employee.hireDate) {
					employee.displayHireDate = moment(employee.hireDate).format('l');
					employee.yos = moment().diff(employee.hireDate, 'years');
					// If the employee has a birthday and it is in the month we are looking at, display them
					if (employee.yos >= vm.requestedYos && employee.yos < vm.nextYos) {
						return employee;
					}
				}
			}), 'hireDate');
		}

		function profileEmployee(employee) {
			edEmployeeService.removeAllSelectedEmployees();
			$state.go('employees.profile.employee', {'employee': employee.eid});
		}
	}
})();