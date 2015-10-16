(function () {
	'use strict';
	angular.module('app').factory('edDeskResourceService', edDeskResourceService);

	edDeskResourceService.$inject = ['$resource'];

	function edDeskResourceService($resource) {
		var deskResource = $resource('/api/desks/:id', {
			_id: '@id'
		}, {
			update: {method: 'PUT', isArray: false}
		});

		return deskResource;
	}
})();
