(function () {
	'use strict';
	angular.module('app').factory('edEventService', edEventService);

	edEventService.$inject = ['$rootScope', 'edCachedEventResourceService', '_', 'moment'];

	function edEventService($rootScope, edCachedEventResourceService, _, moment) {
		var selectedEvent = null;
		var service = {
			getAllEvents: getAllEvents,
			getSelectedEvent: getSelectedEvent,
			updateSelectedEvent: updateSelectedEvent,
			filterEventsByDate: filterEventsByDate
		};
		return service;

		/**
		 * Gets all events from the database (or memory)
		 *
		 * @param {Boolean} cacheBust to get data from server or memory
		 * @return {Array} events
		 */
		function getAllEvents(cacheBust) {
			return edCachedEventResourceService.query(cacheBust);
		}

		/**
		 * Gets the selected event
		 *
		 */
		function getSelectedEvent() {
			return selectedEvent;
		}

		/**
		 * Updates the selected event
		 *
		 * @param {Object} event selected event
		 * @return {Object} mapped employee
		 */
		function updateSelectedEvent(event) {
			if (event) {
				// Find the matching event from the database to use as selectedEvent
				selectedEvent = _.find(getAllEvents(), {_id: event._id});
				// Use the date objects from the calendar
				selectedEvent.start = angular.extend({}, event.start);
				if (event.end) {
					selectedEvent.end = angular.extend({}, event.end);
				}
				selectedEvent.className = event.className.toString();
			} else {
				selectedEvent = null;
			}
			$rootScope.$broadcast('selectedEventChange', selectedEvent);
			return selectedEvent;
		}

		/**
		 * Filters events for the specified date
		 *
		 * @param {Array} events, events to search for one that starts on the specified date
		 * @param {Object} date, event date
		 * @return {Array} events
		 */
		function filterEventsByDate(events, date) {
			return _.filter(events, function (event) {
				if (moment(event.start).isSame(date, 'day')) {
					return event;
				}
			});
		}
	}
})();