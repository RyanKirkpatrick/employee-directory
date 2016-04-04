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

		function filterEmployeesByBirthday(employees) {
			vm.birthdays = edEmployeeService.filterEmployeesByBirthday(employees, today);
		}

		function filterEventsByDate(events) {
			vm.events = edEventService.filterEventsByDate(events, today);
		}

		var deregister = $scope.$on('openTodayPanel', function (event, open) {
			vm.panelOpen = open;
		});

		$scope.$on('$destroy', deregister);
	}
})();