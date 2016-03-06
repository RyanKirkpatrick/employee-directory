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
				employees = edEmployeeResourceService.query({cacheKill: new Date().getTime()}, function (ees) {
					angular.forEach(ees, function (employee) {
						// Create a manager property for each employee
						var manager = _.find(ees, {'eid': employee.mid});
						if (manager) {
							if (manager.nickname) {
								employee.manager = manager.nickname + ' ' + manager.lastName;
							} else {
								employee.manager = manager.firstName + ' ' + manager.lastName;
							}
						}
						// Create a displayName property for each employee
						if (employee.nickname) {
							employee.displayName = employee.nickname + ' ' + employee.lastName;
						} else {
							employee.displayName = employee.firstName + ' ' + employee.lastName;
						}

						// Convert ISO date string to date object
						if (employee.birthdate) {
							employee.birthdate = new Date(employee.birthdate);
						}
					});
				});
			}

			return employees;
		}
	}
})();
