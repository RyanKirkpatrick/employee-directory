(function () {
	'use strict';
	angular.module('app').factory('edArtifactResourceService', edArtifactResourceService);

	edArtifactResourceService.$inject = ['$resource'];

	function edArtifactResourceService($resource) {
		var artifactResource = $resource('/api/artifacts/:id', {
			_id: '@id'
		});

		return artifactResource;
	}
})();