(function () {
	'use strict';
	angular.module('app').factory('edCachedEventResourceService', edCachedEventResourceService);

	edCachedEventResourceService.$inject = ['edEventResourceService'];

	function edCachedEventResourceService(edEventResourceService) {
		var events;
		var service = {
			query: query
		};

		return service;

		function query(cacheBust) {
			if (!events || cacheBust) {
				events = edEventResourceService.query({cacheKill: new Date().getTime()});
			}

			return events;
		}
	}
})();