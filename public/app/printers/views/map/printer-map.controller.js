(function () {
	'use strict';
	angular.module('app').controller('edPrinterMapCtrl', edPrinterMapCtrl);

	edPrinterMapCtrl.$inject = ['$state', '$scope', 'edPrinterService'];

	function edPrinterMapCtrl($state, $scope, edPrinterService) {
		var vm = this;
		vm.selectedPrinters = edPrinterService.setSelectMultiplePrinters(true);
		vm.mappedPrinter = edPrinterService.getMappedPrinter();

		edPrinterService.setDisplayPrinterInfoType('location');
		edPrinterService.setSelectMultiplePrinters(false);

		activate();

		function activate() {
			locatePrinter(vm.mappedPrinter);
		}

		var deregister = $scope.$on('mappedPrinterChange', function (event, mappedPrinter) {
			locatePrinter(mappedPrinter);
		});

		$scope.$on('$destroy', deregister);

		function locatePrinter(printer) {
			if (printer) {
				$state.go('printers.map.' + printer.location + '-' + printer.floor, {'name': printer.name});
			}
		}
	}
})();
