(function () {
	'use strict';
	angular.module('app').directive('edEmployeeCard', edEmployeeCard);

	function edEmployeeCard() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/components/employee-card',
			scope: {
				employee: '='
			},
			link: linkFunc,
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;

		function linkFunc(scope, el, attrs) {
		}
	}

	ctrlFunc.$inject = ['$state', 'edEmployeeService', 'edIdentityService'];

	function ctrlFunc($state, edEmployeeService, edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;
		vm.mapEmployee = mapEmployee;
		vm.deselectEmployee = deselectEmployee;
		vm.editEmployee = editEmployee;

		function mapEmployee(employee) {
			edEmployeeService.removeAllSelectedEmployees();
			edEmployeeService.updateSelectedEmployees(employee);
			$state.go('main.seat-map.floor-' + employee.floor, {'seat': employee.seat});
		}

		function deselectEmployee(employee) {
			edEmployeeService.updateSelectedEmployees(employee);
		}

		function editEmployee(employee) {
			edEmployeeService.removeAllSelectedEmployees();
			edEmployeeService.updateSelectedEmployees(employee);
			$state.go('admin.update-employee');
		}
	}
})();
