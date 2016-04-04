(function () {
	'use strict';
	angular.module('app').controller('edCreateEventCtrl', edCreateEventCtrl);

	edCreateEventCtrl.$inject = ['$scope', 'edNotifierService', 'edSidebarService', 'edEventAdminService', 'edIdentityService', '_'];

	function edCreateEventCtrl($scope, edNotifierService, edSidebarService, edEventAdminService, edIdentityService, _) {
		var vm = this;
		vm.identity = edIdentityService;
		vm.createEvent = createEvent;
		vm.newEvent = {};
		vm.locationOptions = [
			{
				value: 'buf',
				text: 'Buffalo'
			},
			{
				value: 'nyc',
				text: 'NYC'
			},
			{
				value: 'both',
				text: 'Buffalo & NYC'
			}
		];

		activate();

		function activate() {
			resetForm();
			edSidebarService.setLockSidebar(true);
		}

		function resetForm() {
			vm.newEvent = {
				title: '',
				start: '',
				end: '',
				details: '',
				className: '',
				url: '',
				location: '',
				allDay: ''
			};
		}

		function createEvent() {
			var newEventData = {
				title: vm.newEvent.title,
				start: vm.newEvent.start,
				end: vm.newEvent.end,
				details: vm.newEvent.details,
				className: [],
				url: vm.newEvent.url,
				location: vm.newEvent.location,
				allDay: vm.newEvent.allDay
			};

			// Add all the classes
			var classNames = vm.newEvent.className.split(',');
			_.forEach(classNames, function (className) {
				newEventData.className.push(className);
			});

			edEventAdminService.createEvent(newEventData).then(function () {
				edNotifierService.notify('New Event Added');
				resetForm();
				$scope.createEventForm.$setPristine();
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();
