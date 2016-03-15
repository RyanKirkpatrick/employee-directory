(function () {
	'use strict';
	angular.module('app').factory('edDeskService', edDeskService);

	edDeskService.$inject = ['edCachedDeskResourceService'];

	function edDeskService(edCachedDeskResourceService) {
		var service = {
			getAllDesks: getAllDesks
		};

		return service;

		/**
		 * Gets all desks from the database (or memory)
		 *
		 * @return {Array} desks
		 */
		function getAllDesks() {
			return edCachedDeskResourceService.query();
		}
	}
})();