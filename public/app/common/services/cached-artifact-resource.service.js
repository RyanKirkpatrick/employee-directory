(function () {
	'use strict';
	angular.module('app').factory('edCachedArtifactResourceService', edCachedArtifactResourceService);

	edCachedArtifactResourceService.$inject = ['edArtifactResourceService'];

	function edCachedArtifactResourceService(edArtifactResourceService) {
		var artifacts;
		var service = {
			query: query
		};

		return service;

		function query() {
			if (!artifacts) {
				artifacts = edArtifactResourceService.query();
			}

			return artifacts;
		}
	}
})();