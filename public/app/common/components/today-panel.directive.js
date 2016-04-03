(function () {
	'use strict';
	angular.module('app').directive('edTodayPanel', edTodayPanel);

	function edTodayPanel() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/common/components/today-panel',
			replace: true,
			scope: {},
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;
	}

	ctrlFunc.$inject = ['$scope', 'edEmployeeService', 'edEventService', 'edIdentityService', 'moment', '_'];

	function ctrlFunc($scope, edEmployeeService, edEventService, edIdentityService, moment, _) {
		var vm = this;
		vm.identity = edIdentityService;
		vm.panelOpen = false;
		vm.dayOfMonth = moment().date();
		vm.monthOfYear = moment().format('MMM');
		vm.birthdays = [];
		vm.events = [];
		vm.togglePanel = togglePanel;

		edEmployeeService.getAllEmployees().$promise.then(filterEmployeesByBirthday);
		edEventService.getAllEvents().$promise.then(filterEventsByDate);

		function togglePanel() {
			vm.panelOpen = !vm.panelOpen;
		}

		var today = moment();

		/**
		 * Filters employees with the specified birthday
		 *
		 * @param {Array} employees, employees to search for a birthday
		 * @param {Object} date, birthday
		 * @return {Array} employees
		 */
		function filterEmployeesByBirthday(employees) {
			vm.birthdays = _.filter(employees, function (employee) {
				if (employee.birthdate && moment(employee.birthdate).date() === moment().date() && moment(employee.birthdate).month() === moment().month()) {
					return employee;
				}
			});
		}

		/**
		 * Filters events for the specified date (excluding year)
		 *
		 * @param {Array} events, events to search for one that starts on the specified date
		 * @param {Object} date, event date
		 * @return {Array} events
		 */
		function filterEventsByDate(events) {
			vm.events =  _.filter(events, function (event) {
				if (moment(event.start).isSame(today, 'day')) {
					return event;
				}
			});
		}

		var deregister = $scope.$on('openTodayPanel', function (event, open) {
			vm.panelOpen = open;
		});

		$scope.$on('$destroy', deregister);
	}
})();