(function () {
	'use strict';
	angular.module('app').controller('edIndexCtrl', edIndexCtrl);

	edIndexCtrl.$inject = ['edSidebarService', 'edIdentityService', 'edEmployeeService', 'edEventService', 'moment'];

	function edIndexCtrl(edSidebarService, edIdentityService, edEmployeeService, edEventService, moment) {
		var vm = this;
		vm.identity = edIdentityService;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
			edEmployeeService.getAllEmployees().$promise.then(filterEmployeesByBirthday);
			edEventService.getAllEvents().$promise.then(filterEventsByDate);
		}

		var today = moment();

		function filterEmployeesByBirthday(employees) {
			if (edEmployeeService.filterEmployeesByBirthday(employees, today).length > 0) {
				edSidebarService.openTodayPanel(true);
			}
		}

		function filterEventsByDate(events) {
			if (edEventService.filterEventsByDate(events, today).length > 0) {
				edSidebarService.openTodayPanel(true);
			}
		}
	}
})();