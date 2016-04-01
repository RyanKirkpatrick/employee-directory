(function () {
	'use strict';
	angular.module('app').directive('edEventInfo', edEventInfo);

	edEventInfo.$inject = ['$timeout', '$sce', 'edEventService', 'moment'];

	function edEventInfo($timeout, $sce, edEventService, moment) {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/events/components/event-info',
			scope: {},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attrs) {
			scope.selectedEvent = edEventService.updateSelectedEvent(null);

			var deregister = scope.$on('selectedEventChange', function (event, selectedEvent) {
				if (scope.selectedEvent) {
					el.addClass('slide-out').removeClass('slide-in');
					$timeout(function () {
						el.removeClass('slide-out').addClass('slide-in');
						populateEventInfo(selectedEvent);
						$timeout(function () {
							angular.element('.nano').nanoScroller();
						}, 300);
					}, 200);
				} else {
					el.addClass('slide-in');
					populateEventInfo(selectedEvent);
				}
			});

			scope.$on('$destroy', deregister);

			function populateEventInfo(event) {
				scope.selectedEvent = angular.copy(event);
				if (!scope.selectedEvent.allDay) {
					scope.selectedEvent.start = moment(event.start).format('h:mm a');
					scope.selectedEvent.end = moment(event.end).format('h:mm a');
				}
				scope.selectedEvent.day = moment(event.start).format('MMMM Do, YYYY');
				scope.selectedEvent.details = $sce.trustAsHtml(event.details);
			}
		}
	}
})();