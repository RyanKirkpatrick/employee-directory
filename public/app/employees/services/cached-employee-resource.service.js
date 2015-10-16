(function () {
	'use strict';
	angular.module('app').factory('edCachedEmployeeResourceService', edCachedEmployeeResourceService);

	edCachedEmployeeResourceService.$inject = ['edEmployeeResourceService'];

	function edCachedEmployeeResourceService(edEmployeeResourceService) {
		var employees;
		var service = {
			query: query
		};

		return service;

		function query(cacheBust) {
			if (!employees || cacheBust) {
				employees = edEmployeeResourceService.query();
			}

			return employees;
		}
	}
})();
