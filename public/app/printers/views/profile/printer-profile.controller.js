(function () {
	'use strict';
	angular.module('app').controller('edPrinterProfileCtrl', edPrinterProfileCtrl);

	edPrinterProfileCtrl.$inject = ['$scope', '$document', 'edPrinterService', '$stateParams'];

	function edPrinterProfileCtrl($scope, $document, edPrinterService, $stateParams) {
		var vm = this;
		vm.selectedPrinters = edPrinterService.getSelectedPrinters();
		vm.changePage = changePage;
		vm.currentPage = edPrinterService.getProfilePageNumber();

		edPrinterService.setDisplayPrinterInfoType('profile');
		edPrinterService.setSelectMultiplePrinters(true);
		edPrinterService.updateMappedPrinter(null);

		if ($stateParams.printer || $stateParams.printerbrand) {
			edPrinterService.removeAllSelectedPrinters();
			if ($stateParams.printer) {
				edPrinterService.getAllPrinters().$promise.then(selectPrinterByName);
			} else if ($stateParams.printerbrand) {
				edPrinterService.getAllPrinters().$promise.then(selectPrinterByBrand);
			}
		}

		function selectPrinterByName(printers) {
			var selectedPrinters = printers.filter(function (printer) {
				var match = false;
				if ($stateParams.printer) {
					// Split name query on comma
					var printers = $stateParams.printer.split(',');
					// Loop over each printer name
					angular.forEach(printers, function (name) {
						// If the printer's name is part of the query select it
						if (printer.name.toLocaleLowerCase() === name.toLowerCase()) {
							match = true;
						} else {
							return false;
						}
					});
				}
				return match;
			});

			angular.forEach(selectedPrinters, function (printer) {
				edPrinterService.updateSelectedPrinters(printer);
			});
		}

		function selectPrinterByBrand(printers) {
			var selectedPrinters = printers.filter(function (printer) {
				var match = false;
				if ($stateParams.printerbrand) {
					// Split printerbrand query on comma
					var printerbrands = $stateParams.printerbrand.split(',');
					// Loop over each printerbrand
					angular.forEach(printerbrands, function (brand) {
						// If the printer's branc is part of the query select it
						if (printer.brand.toLocaleLowerCase() === brand.toLowerCase()) {
							match = true;
						} else {
							return false;
						}
					});
				}
				return match;
			});

			angular.forEach(selectedPrinters, function (printer) {
				edPrinterService.updateSelectedPrinters(printer);
			});
		}

		function changePage(newPageNumber) {
			edPrinterService.setProfilePageNumber(newPageNumber);
			$document.scrollTopAnimated(0, 300);
		}

		var deregister = $scope.$on('selectedPrinterChange', function (event, selectedPrinters) {
			vm.selectedPrinters = selectedPrinters;
			// If we added to selected printers, go to first page and scroll to the top
			if (edPrinterService.getSelectedPrinterAdded()) {
				vm.currentPage = 1;
				$document.scrollTopAnimated(0, 300);
			}
		});

		$scope.$on('$destroy', deregister);
	}
})();