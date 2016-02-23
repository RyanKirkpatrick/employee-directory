(function () {
	'use strict';
	angular.module('app').controller('edPrinterTopbarCtrl', edPrinterTopbarCtrl);

	edPrinterTopbarCtrl.$inject = ['$scope', 'edPrinterService'];

	function edPrinterTopbarCtrl($scope, edPrinterService) {
		var vm = this;
		vm.selectedPrinters = edPrinterService.getSelectedPrinters();

		var deregisterSelectedPrintersChanged = $scope.$on('selectedPrintersChange', function (event, selectedPrinters) {
			vm.selectedPrinters = selectedPrinters;
		});

		$scope.$on('$destroy', deregisterSelectedPrintersChanged);
	}
})();