(function () {
	'use strict';
	angular.module('app').directive('edEmployeeCard', edEmployeeCard);

	edEmployeeCard.$inject = ['$timeout', '$state', 'edEmployeeService'];

	function edEmployeeCard($timeout, $state, edEmployeeService) {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/employees/components/employee-card',
			scope: {
				employee: '='
			},
			link: linkFunc,
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;

		function linkFunc(scope, el, attrs, vm) {
			vm.twEmail = scope.employee.email.split('@')[0] + '@towerswatson.com';

			vm.deselectEmployee = function (employee) {
				var parent = el.parent();
				var child = el.children().first();
				child.addClass('scale-down');
				$timeout(function () {
					parent.addClass('shrink-left');
					edEmployeeService.updateSelectedEmployees(employee);
					if ($state.current.name !== 'employees.profile') {
						$state.go('employees.profile');
					}
				}, 250);
			};
		}
	}

	ctrlFunc.$inject = ['$state', 'edEmployeeService', 'edIdentityService'];

	function ctrlFunc($state, edEmployeeService, edIdentityService) {
		var vm = this;
		vm.identity = edIdentityService;
		vm.mapEmployee = mapEmployee;
		vm.editEmployee = editEmployee;

		function mapEmployee(employee) {
			edEmployeeService.updateMappedEmployee(employee);
			$state.go('employees.map.' + employee.location + '-' + employee.floor, {'seat': employee.seat});
		}

		function editEmployee(employee) {
			edEmployeeService.removeAllSelectedEmployees();
			edEmployeeService.updateSelectedEmployees(employee);
			$state.go('admin.update-employee');
		}
	}
})();