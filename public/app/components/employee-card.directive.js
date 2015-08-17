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

	ctrlFunc.$inject = ['$state', 'edEmployeeService'];

	function ctrlFunc($state, edEmployeeService) {
		var vm = this;
		vm.mapEmployee = mapEmployee;
		vm.deselectEmployee = deselectEmployee;

		function mapEmployee(employee) {
			edEmployeeService.removeAllSelectedEmployees();
			edEmployeeService.updateSelectedEmployees(employee);
			$state.go('seat-map.floor-' + employee.deskLoc.floor, {'pos': employee.deskLoc.pos});
		}

		function deselectEmployee(employee) {
			edEmployeeService.updateSelectedEmployees(employee);
		}
	}
})();
