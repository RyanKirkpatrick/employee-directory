(function () {
	'use strict';
	angular.module('app').factory('edCachedUserResourceService', edCachedUserResourceService);

	edCachedUserResourceService.$inject = ['edUserResourceService', '_'];

	function edCachedUserResourceService(edUserResourceService, _) {
		var users;
		var service = {
			query: query
		};

		return service;

		function query(cacheBust) {
			if (!users || cacheBust) {
				users = edUserResourceService.query({cacheKill: new Date().getTime()});
			}

			return users;
		}
	}
})();