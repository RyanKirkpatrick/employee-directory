(function () {
	'use strict';
	angular.module('app').controller('edUpdateEventCtrl', edUpdateEventCtrl);

	edUpdateEventCtrl.$inject = ['$state', 'edNotifierService', 'edEventService', 'edEventAdminService', 'edIdentityService', 'edSidebarService', '_'];

	function edUpdateEventCtrl($state, edNotifierService, edEventService, edEventAdminService, edIdentityService, edSidebarService, _) {
		var vm = this;
		vm.identity = edIdentityService;
		vm.updateEvent = updateEvent;
		vm.deleteEvent = deleteEvent;
		vm.cancelUpdateEvent = cancelUpdateEvent;
		vm.selectedEvent = edEventService.getSelectedEvent();

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
			if (!vm.selectedEvent) {
				edNotifierService.info('Please select an event to update.');
				$state.go('events');
			}
			//vm.selectedEvent = angular.extend({}, vm.selEvent);
		}

		function updateEvent() {
			// Get the event data from the form
			var newEventData = {
				title: vm.selectedEvent.title,
				start: vm.selectedEvent.start,
				end: vm.selectedEvent.end,
				details: vm.selectedEvent.details,
				className: [],
				url: vm.selectedEvent.url,
				link: vm.selectedEvent.link,
				allDay: vm.selectedEvent.allDay
			};

			// Add all the classes
			var classNames = vm.selectedEvent.className.split(',');
			_.forEach(classNames, function (className) {
				newEventData.className.push(className.trim());
			});

			edEventAdminService.updateEvent(newEventData).then(function (event) {
				edNotifierService.notify('Event information updated!');
				$state.go('events');
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}

		/**
		 * Marks event as deleted
		 */
		function deleteEvent() {
			edEventAdminService.updateEvent({deleted: true}).then(function (event) {
				edNotifierService.notify('Event deleted!');
				$state.go('events');
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}

		function cancelUpdateEvent() {
			$state.go('events');
		}
	}
})();