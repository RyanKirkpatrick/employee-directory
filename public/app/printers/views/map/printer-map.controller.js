(function () {
	'use strict';
	angular.module('app').controller('edPrinterMapCtrl', edPrinterMapCtrl);

	edPrinterMapCtrl.$inject = ['$state', '$scope', 'edPrinterService', 'edSidebarService'];

	function edPrinterMapCtrl($state, $scope, edPrinterService, edSidebarService) {
		var vm = this;
		vm.selectedPrinters = edPrinterService.setSelectMultiplePrinters(true);
		vm.mappedPrinter = edPrinterService.getMappedPrinter();

		activate();

		function activate() {
			edSidebarService.setLockSidebar(false);
			edPrinterService.setDisplayPrinterInfoType('location');
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
