(function () {
	'use strict';
	angular.module('app').directive('edDesk', edDesk);

	edDesk.$inject = ['$stateParams', '$document', '$timeout', '$compile', 'edEmployeeService'];

	function edDesk($stateParams, $document, $timeout, $compile, edEmployeeService) {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/employees/components/desk',
			replace: true,
			scope: {
				location: '@',
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

			// If coming from the profile page via a link in the employee card
			if ($stateParams.seat === attrs.seat && scope.mappedEmployee) {
				$timeout(function () {
					$document.scrollToElement(el, 300, 300).then(function () {
						el.addClass('mapped').append($compile('<div class="marker"><div class="pulse"></div><div class="pin"></div>' +
							'<div class="mapped-label label bg-danger" ng-click="vm.viewProfile()">' + getDisplayName(scope.mappedEmployee) + ' ' + scope.mappedEmployee.lastName + '</div></div>')(scope));
						// Do some math to figure out how to center the label
						var markerLabel = $('.mapped-label');
						var leftPos = (el.outerWidth() / 2) - (markerLabel.outerWidth() / 2);
						markerLabel.css('left', leftPos);
					});
				}, 800);
			} else {
				el.removeClass('mapped').find('.marker').remove();
			}

			var deregister = scope.$on('mappedEmployeeChange', function (event, mappedEmployee) {
				if (mappedEmployee && mappedEmployee.seat === attrs.seat) {
					$timeout(function () {
						$document.scrollToElement(el, 300, 300).then(function () {
							el.addClass('mapped').append($compile('<div class="marker"><div class="pulse"></div><div class="pin"></div>' +
								'<div class="mapped-label label bg-danger" ng-click="vm.viewProfile()">' + getDisplayName(mappedEmployee) + ' ' + mappedEmployee.lastName + '</div></div>')(scope));
							// Do some math to figure out how to center the label
							var markerLabel = $('.mapped-label');
							var leftPos = (el.outerWidth() / 2) - (markerLabel.outerWidth() / 2);
							markerLabel.css('left', leftPos);
						});
					}, 100);
				} else {
					el.removeClass('mapped').find('.marker').remove();
				}
			});

			scope.$on('$destroy', deregister);
		}

		function getDisplayName(employee) {
			if (employee.nickname) {
				return employee.nickname;
			} else {
				return employee.firstName;
			}
		}
	}

	ctrlFunc.$inject = ['$state', 'edEmployeeService', 'edNotifierService', 'edIdentityService', 'edPrinterService', 'edRoomService'];

	function ctrlFunc($state, edEmployeeService, edNotifierService, edIdentityService, edPrinterService, edRoomService) {
		var vm = this;
		vm.mapEmployee = mapEmployee;
		vm.viewProfile = viewProfile;
		vm.employees = edEmployeeService.getAllEmployees();
		vm.mappedEmployee = null;
		vm.identity = edIdentityService;

		var viewingProfile = false;

		function mapEmployee(seat, location) {
			// Don't map employee if the user wants to view the profile
			if (!viewingProfile) {
				var mappedEmployeeArray = vm.employees.filter(function (employee) {
					return employee.seat === seat && employee.location === location;
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

		function viewProfile() {
			viewingProfile = true;
			edEmployeeService.removeAllSelectedEmployees();
			edEmployeeService.updateSelectedEmployees(edEmployeeService.getMappedEmployee());
			$state.go('employees');
		}
	}
})();