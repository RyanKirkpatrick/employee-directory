(function () {
	'use strict';
	angular.module('app').factory('edPrinterResourceService', edPrinterResourceService);

	edPrinterResourceService.$inject = ['$resource'];

	function edPrinterResourceService($resource) {
		var printerResource = $resource('/api/printers/:id', {
			_id: '@id'
		}, {
			update: {method: 'PUT', isArray: false}
		});

		return printerResource;
	}
})();
