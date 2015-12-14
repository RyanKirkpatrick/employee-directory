(function () {
	'use strict';
	angular.module('app').factory('edArtifactService', edArtifactService);

	edArtifactService.$inject = ['edCachedArtifactResourceService'];

	function edArtifactService(edCachedArtifactResourceService) {
		var service = {
			getAllArtifacts: getAllArtifacts
		};
		return service;

		/**
		 * Gets all artifacts from the database (or memory)
		 *
		 * @return {Array} artifacts
		 */
		function getAllArtifacts() {
			return edCachedArtifactResourceService.query();
		}
	}
})();