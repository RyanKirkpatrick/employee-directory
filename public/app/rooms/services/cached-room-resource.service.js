(function () {
	'use strict';
	angular.module('app').factory('edCachedRoomResourceService', edCachedRoomResourceService);

	edCachedRoomResourceService.$inject = ['edRoomResourceService'];

	function edCachedRoomResourceService(edRoomResourceService) {
		var rooms;
		var service = {
			query: query
		};

		return service;

		function query() {
			if (!rooms) {
				rooms = edRoomResourceService.query();
			}

			return rooms;
		}
	}
})();
