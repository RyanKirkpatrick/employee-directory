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

		if ($stateParams.printer) {
			edPrinterService.getAllPrinters().$promise.then(selectPrinter);
		}

		function selectPrinter(printers) {
			var selectedPrinters = printers.filter(function (printer) {
				var match = false;
				if ($stateParams.printer) {
					// Split name query on comma
					var names = $stateParams.printer.split(',');
					// Loop over each first name
					angular.forEach(names, function (name) {
						// If the printer's name is part of the query check the last names
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