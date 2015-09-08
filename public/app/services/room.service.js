(function () {
	'use strict';
	angular.module('app').factory('edRoomService', edRoomService);

	edRoomService.$inject = ['edCachedRoomResourceService'];

	function edRoomService(edCachedRoomResourceService) {
		var service = {
			getAllRooms: getAllRooms
		};

		return service;

		function getAllRooms() {
			return edCachedRoomResourceService.query();
		}
	}
})();
