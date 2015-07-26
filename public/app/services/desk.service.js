(function () {
	'use strict';
	angular.module('app').factory('edDeskService', edDeskService);

	edDeskService.$inject = ['edCachedDeskResourceService'];

	function edDeskService(edCachedDeskResourceService) {
		var service = {
			getAllDesks: getAllDesks,
		};
		return service;

		function getAllDesks() {
			return edCachedDeskResourceService.query();
		}
	}
})();
