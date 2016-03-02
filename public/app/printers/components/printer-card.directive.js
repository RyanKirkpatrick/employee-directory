(function () {
	'use strict';
	angular.module('app').directive('edPrinterCard', edPrinterCard);

	edPrinterCard.$inject = ['$timeout', '$state', 'edPrinterService'];

	function edPrinterCard($timeout, $state, edPrinterService) {
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

		function linkFunc(scope, el, attrs, vm) {
			vm.deselectPrinter = function (printer) {
				var parent = el.parent();
				var child = el.children().first();
				child.addClass('scale-down');
				$timeout(function () {
					parent.addClass('shrink-left');
					edPrinterService.updateSelectedPrinters(printer);
					if ($state.current.name !== 'printers.profile') {
						$state.go('printers.profile');
					}
				}, 250);
			};
		}
	}

	ctrlFunc.$inject = ['$state', 'edPrinterService'];

	function ctrlFunc($state, edPrinterService) {
		var vm = this;
		vm.mapPrinter = mapPrinter;

		function mapPrinter(printer) {
			edPrinterService.updateMappedPrinter(printer);
			$state.go('printers.map.' + printer.location + '-' + printer.floor, {'name': printer.name});
		}
	}
})();