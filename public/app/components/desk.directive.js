(function () {
	'use strict';
	angular.module('app').directive('edDesk', edDesk);

	edDesk.$inject = ['$rootScope', '$stateParams', '$document', '$timeout', 'edEmployeeService'];

	function edDesk($rootScope, $stateParams, $document, $timeout, edEmployeeService) {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/components/desk',
			replace: true,
			scope: {
				seat: '@',
				orientation: '@',
				classification: '@',
				xpos: '@',
				ypos: '@'
			},
			link: linkFunc,
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;

		function linkFunc(scope, el, attrs) {
			scope.mappedEmployee = edEmployeeService.getMappedEmployee();

			if ($stateParams.seat === attrs.seat) {
				$timeout(function () {
					$document.scrollToElement(el, 300, 300).then(function () {
						el.addClass('mapped').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>' +
							'<div class="mapped-employee-label label bg-danger">' + scope.mappedEmployee.firstName + ' ' + scope.mappedEmployee.lastName + '</div>');
					});
				}, 800);
			} else {
				el.removeClass('mapped').find('.marker').remove();
				el.find('.mapped-employee-label').remove();
			}

			var deregister = $rootScope.$on('mappedEmployeeChange', function (event, mappedEmployee) {
				if (mappedEmployee && mappedEmployee.seat === attrs.seat) {
					$timeout(function () {
						$document.scrollToElement(el, 300, 300).then(function () {
							el.addClass('mapped').append('<div class="marker"><div class="pulse"></div><div class="pin"></div></div>' +
								'<div class="mapped-employee-label label bg-danger">' + mappedEmployee.firstName + ' ' + mappedEmployee.lastName + '</div>');
						});
					}, 100);
				} else {
					el.removeClass('mapped').find('.marker').remove();
					el.find('.mapped-employee-label').remove();
				}
			});

			scope.$on('$destroy', deregister);
		}
	}

	ctrlFunc.$inject = ['edEmployeeService', 'edNotifierService'];

	function ctrlFunc(edEmployeeService, edNotifierService) {
		var vm = this;
		vm.mapEmployee = mapEmployee;
		vm.employees = edEmployeeService.getAllEmployees();
		vm.mappedEmployee = null;

		function mapEmployee(seat) {
			var mappedEmployeeArray = vm.employees.filter(function (employee) {
				return employee.seat === seat;
			});

			if (mappedEmployeeArray.length > 0) {
				vm.mappedEmployee = edEmployeeService.updateMappedEmployee(mappedEmployeeArray[0]);
			} else {
				edNotifierService.error('Sorry, I don\'t know who sits there.');
			}
		}
	}
})();