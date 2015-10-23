(function () {
	'use strict';
	angular.module('app').directive('edPrinterCard', edPrinterCard);

	function edPrinterCard() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/printers/components/printer-card',
			scope: {
				printer: '='
			},
			link: linkFunc,
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;

		function linkFunc(scope, el, attrs) {
		}
	}

	ctrlFunc.$inject = ['$state', 'edPrinterService'];

	function ctrlFunc($state, edPrinterService) {
		var vm = this;
		vm.mapPrinter = mapPrinter;
		vm.deselectPrinter = deselectPrinter;

		function mapPrinter(printer) {
			edPrinterService.updateMappedPrinter(printer);
			$state.go('printers.map.' + printer.location + '-' + printer.floor, {'name': printer.name});
		}

		function deselectPrinter(printer) {
			edPrinterService.updateSelectedPrinters(printer);
		}
	}
})();