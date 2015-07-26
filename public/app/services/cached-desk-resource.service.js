(function () {
	'use strict';
	angular.module('app').factory('edCachedDeskResourceService', edCachedDeskResourceService);

	edCachedDeskResourceService.$inject = ['edDeskResourceService'];

	function edCachedDeskResourceService(edDeskResourceService) {
		var desks;
		var service = {
			query: query,
		};

		return service;

		function query() {
			if (!desks) {
				desks = edDeskResourceService.query();
			}

			return desks;
		}
	}
})();
