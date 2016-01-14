(function () {
	'use strict';
	angular.module('app').factory('edUserResourceService', edUserResourceService);

	edUserResourceService.$inject = ['$resource'];

	function edUserResourceService($resource) {
		var userResource = $resource('/api/users/:id', {
			_id: '@id'
		}, {
			update: {method: 'PUT', isArray: false}
		});

		userResource.prototype.isAdmin = function () {
			return this.roles && this.roles.indexOf('admin') > -1;
		};

		return userResource;
	}
})();