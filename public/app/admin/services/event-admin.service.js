(function () {
	'use strict';
	angular.module('app').factory('edEventAdminService', edEventAdminService);

	edEventAdminService.$inject = ['$rootScope', '$q', 'edEventService', 'edEventResourceService'];

	function edEventAdminService($rootScope, $q, edEventService, edEventResourceService) {
		var service = {
			updateEvent: updateEvent,
			createEvent: createEvent
		};
		return service;

		/**
		 * Updates event record in database
		 * Uses the selected event for updating
		 *
		 * @param {Object} newEventData event data to update
		 * @return {Object} promise
		 */
		function updateEvent(newEventData) {
			var dfd = $q.defer();
			var selectedEvent = edEventService.getSelectedEvent();
			var clone = angular.copy(selectedEvent);
			angular.extend(clone, newEventData);
			clone.$update().then(function (event) {
				$rootScope.$broadcast('eventsUpdated', edEventService.getAllEvents(true));
				dfd.resolve(event);
			}, function (response) {
				dfd.reject(response.data.reason);
			});
			return dfd.promise;
		}

		/**
		 * Create event record in database
		 *
		 * @param {Object} newEventData event data to insert
		 * @return {Object} promise
		 */
		function createEvent(newEventData) {
			var newEvent = new edEventResourceService(newEventData);
			var dfd = $q.defer();

			newEvent.$save().then(function (event) {
				$rootScope.$broadcast('eventsUpdated', edEventService.getAllEvents(true));
				dfd.resolve(event);
			}, function (response) {
				dfd.reject(response.data.reason);
			});
			return dfd.promise;
		}
	}
})();