(function () {
	'use strict';
	angular.module('app').controller('edEventCtrl', edEventCtrl);

	edEventCtrl.$inject = ['edSidebarService', 'edEventService', '_'];

	function edEventCtrl(edSidebarService, edEventService, _) {
		var vm = this;
		vm.selectEvent = selectEvent;
		vm.events = [];

		activate();

		function activate() {
			edSidebarService.setLockSidebar(false);
			edEventService.getAllEvents().$promise.then(loadEvents);

			/* config object */
			vm.uiConfig = {
				calendar: {
					editable: false,
					height: 650,
					timezone: 'local',
					header: {
						left: 'prev,next today',
						center: 'title',
						right: 'month,agendaWeek,agendaDay'
					},
					eventClick: selectEvent
				}
			};

			vm.eventSources = [vm.events];
		}

		function loadEvents(events) {
			_.forEach(events, function (event) {
				vm.events.push(event);
			});
		}

		function selectEvent(event) {
			edEventService.updateSelectedEvent(event);
			$('.fc-event.selected').removeClass('selected');
			$(this).addClass('selected');
		}
	}
})();