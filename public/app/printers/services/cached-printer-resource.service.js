(function () {
	'use strict';
	angular.module('app').factory('edCachedPrinterResourceService', edCachedPrinterResourceService);

	edCachedPrinterResourceService.$inject = ['edPrinterResourceService'];

	function edCachedPrinterResourceService(edPrinterResourceService) {
		var printers;
		var service = {
			query: query
		};

		return service;

		function query() {
			if (!printers) {
				printers = edPrinterResourceService.query();
			}

			return printers;
		}
	}
})();
