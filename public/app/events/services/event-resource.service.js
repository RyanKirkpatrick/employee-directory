(function () {
	'use strict';
	angular.module('app').factory('edEventResourceService', edEventResourceService);

	edEventResourceService.$inject = ['$resource'];

	function edEventResourceService($resource) {
		var eventResource = $resource('/api/events/:id', {
			_id: '@id'
		}, {
			update: {method: 'PUT', isArray: false}
		});

		return eventResource;
	}
})();
