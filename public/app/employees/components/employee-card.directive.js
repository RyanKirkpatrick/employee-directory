(function () {
	'use strict';
	angular.module('app').directive('edEmployeeCard', edEmployeeCard);

	edEmployeeCard.$inject = ['$timeout', '$state', 'edEmployeeService', 'moment'];

	function edEmployeeCard($timeout, $state, edEmployeeService, moment) {
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
			// Some people have a different usernames for lync than their liazon email address
			if (scope.employee.lync) {
				vm.twEmail = scope.employee.lync + '@towerswatson.com';
			} else {
				vm.twEmail = scope.employee.email.split('@')[0] + '@towerswatson.com';
			}

			// Years of Service
			if (scope.employee.hireDate) {
				vm.yos = moment().diff(scope.employee.hireDate, 'years');
				if (vm.yos >= 5) {
					vm.seniorityClass = 'years-5';
					vm.seniorityBucket = 5;
				} else if (vm.yos >= 3) {
					vm.seniorityClass = 'years-3';
					vm.seniorityBucket = 3;
				} else if (vm.yos >= 1) {
					vm.seniorityClass = 'years-1';
					vm.seniorityBucket = 1;
				}
			}

			// Birthday
			if (scope.employee.birthdate) {
				vm.birthDayAndMonth = moment(scope.employee.birthdate).format('MMM D');
				vm.birthMonthOfYear = moment(scope.employee.birthdate).format('MMMM').toLowerCase();
			}

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