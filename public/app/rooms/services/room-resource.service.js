(function () {
	'use strict';
	angular.module('app').factory('edRoomResourceService', edRoomResourceService);

	edRoomResourceService.$inject = ['$resource'];

	function edRoomResourceService($resource) {
		var roomResource = $resource('/api/rooms/:id', {
			_id: '@id'
		}, {
			update: {method: 'PUT', isArray: false}
		});

		return roomResource;
	}
})();
