(function () {
	'use strict';
	angular.module('app').directive('edDesk', edDesk);

	edDesk.$inject = ['$stateParams', '$document', '$timeout', 'edEmployeeService'];

	function edDesk($stateParams, $document, $timeout, edEmployeeService) {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/employees/components/desk',
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

			if ($stateParams.seat === attrs.seat && scope.mappedEmployee) {
				$timeout(function () {
					$document.scrollToElement(el, 300, 300).then(function () {
						el.addClass('mapped').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>' +
							'<div class="mapped-label label bg-danger">' + getDisplayName(scope.mappedEmployee) + ' ' + scope.mappedEmployee.lastName + '</div></div>');
					});
				}, 800);
			} else {
				el.removeClass('mapped').find('.marker').remove();
			}

			var deregister = scope.$on('mappedEmployeeChange', function (event, mappedEmployee) {
				if (mappedEmployee && mappedEmployee.seat === attrs.seat) {
					$timeout(function () {
						$document.scrollToElement(el, 300, 300).then(function () {
							el.addClass('mapped').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>' +
								'<div class="mapped-label label bg-danger">' + getDisplayName(mappedEmployee) + ' ' + mappedEmployee.lastName + '</div></div>');
						});
					}, 100);
				} else {
					el.removeClass('mapped').find('.marker').remove();
				}
			});

			scope.$on('$destroy', deregister);
		}

		function getDisplayName(employee) {
			if (employee.nickName) {
				return employee.nickName;
			} else {
				return employee.firstName;
			}
		}
	}

	ctrlFunc.$inject = ['edEmployeeService', 'edNotifierService', 'edIdentityService', 'edPrinterService', 'edRoomService'];

	function ctrlFunc(edEmployeeService, edNotifierService, edIdentityService, edPrinterService, edRoomService) {
		var vm = this;
		vm.mapEmployee = mapEmployee;
		vm.employees = edEmployeeService.getAllEmployees();
		vm.mappedEmployee = null;
		vm.identity = edIdentityService;

		function mapEmployee(seat) {
			var mappedEmployeeArray = vm.employees.filter(function (employee) {
				return employee.seat === seat;
			});

			if (mappedEmployeeArray.length > 0) {
				// Only allow 1 thing to be mapped at a time
				edPrinterService.updateMappedPrinter(null);
				edRoomService.updateMappedRoom(null);
				vm.mappedEmployee = edEmployeeService.updateMappedEmployee(mappedEmployeeArray[0]);
			} else {
				edNotifierService.error('Sorry, I don\'t know who sits there.');
			}
		}
	}
})();