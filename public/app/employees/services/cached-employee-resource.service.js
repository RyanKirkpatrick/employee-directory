(function () {
	'use strict';
	angular.module('app').factory('edCachedEmployeeResourceService', edCachedEmployeeResourceService);

	edCachedEmployeeResourceService.$inject = ['edEmployeeResourceService', '_'];

	function edCachedEmployeeResourceService(edEmployeeResourceService, _) {
		var employees;
		var service = {
			query: query
		};

		return service;

		function query(cacheBust) {
			if (!employees || cacheBust) {
				employees = edEmployeeResourceService.query(function(ees) {
					angular.forEach(ees, function (employee) {
						var manager = _.find(ees, {'eid': employee.mid});
						if (manager) {
							employee.manager = manager.firstName + ' ' + manager.lastName;
						}
					});
				});
			}

			return employees;
		}
	}
})();
