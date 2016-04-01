(function () {
	'use strict';
	angular.module('app').controller('edEventSidebarCtrl', edEventSidebarCtrl);

	edEventSidebarCtrl.$inject = ['$scope', 'edEventService', 'edIdentityService'];

	function edEventSidebarCtrl($scope, edEventService, edIdentityService) {
		var vm = this;
		vm.selectedEvent = edEventService.getSelectedEvent();
		vm.identity = edIdentityService;

		var deregisterSelectedEventChange = $scope.$on('selectedEventChange', function (event, selectedEvent) {
			vm.selectedEvent = angular.copy(selectedEvent);
		});

		$scope.$on('$destroy', deregisterSelectedEventChange);
	}
})();