(function () {
	'use strict';
	angular.module('app').controller('edPrinterSelectorCtrl', edPrinterSelectorCtrl);

	edPrinterSelectorCtrl.$inject = ['$scope', '$document', 'edPrinterService', 'edEmployeeService', 'edRoomService'];

	function edPrinterSelectorCtrl($scope, $document, edPrinterService, edEmployeeService, edRoomService) {
		var vm = this;
		vm.printers = edPrinterService.getAllPrinters();
		vm.selectedPrinters = edPrinterService.getSelectedPrinters();
		vm.displayPrinterInfoType = edPrinterService.getDisplayPrinterInfoType();
		vm.selectPrinter = selectPrinter;
		vm.selectAll = selectAll;
		vm.selectNone = selectNone;
		vm.allowSelectAll = edPrinterService.getSelectMultiplePrinters();
		vm.filteredEmployees = edPrinterService.getAllPrinters();
		vm.clearFilter = clearFilter;
		vm.floorFilter = floorFilter;
		vm.filterFloors = filterFloors;
		vm.floor = {
			'6': false,
			'7': false,
			'8': false
		};
		vm.floors = [];

		function selectPrinter(printer) {
			if (vm.displayPrinterInfoType === 'profile') {
				vm.selectedPrinters = edPrinterService.updateSelectedPrinters(printer);
			}
			else if (vm.displayPrinterInfoType === 'location') {
				// Only allow 1 thing to be mapped at a time
				edEmployeeService.updateMappedEmployee(null);
				edRoomService.updateMappedRoom(null);
				edPrinterService.updateMappedPrinter(printer);
			}
		}

		function filterFloors(floor) {
			if (vm.floor[floor]) {
				vm.floors.push(floor);
			} else {
				vm.floors.splice(vm.floors.indexOf(floor), 1);
			}
		}

		function floorFilter(printer) {
			if (vm.floors.length > 0) {
				if (printer.floor) {
					return vm.floors.indexOf(printer.floor) > -1;
				}
			} else {
				return true;
			}
		}

		function selectAll() {
			vm.selectedPrinters = edPrinterService.addAllFilteredPrinters(vm.filteredPrinters);
			$document.scrollTopAnimated(0, 300);
		}

		function selectNone() {
			vm.selectedPrinters = edPrinterService.removeAllSelectedPrinters();
		}

		function clearFilter() {
			vm.printerName = '';
			vm.floors = [];
			vm.floor = {
				'6': false,
				'7': false,
				'8': false
			};
			vm.brand = '';
			vm.color = '';
		}

		var deregisterSelectMultiplePrintersChange = $scope.$on('selectMultiplePrintersChange', function (event, allowSelectMultiplePrinters) {
			vm.allowSelectAll = allowSelectMultiplePrinters;
		});

		$scope.$on('$destroy', deregisterSelectMultiplePrintersChange);

		var deregisterDisplayPrinterInfoTypeChange = $scope.$on('displayPrinterInfoTypeChange', function (event, displayPrinterInfoType) {
			vm.displayPrinterInfoType = displayPrinterInfoType;
		});

		$scope.$on('$destroy', deregisterDisplayPrinterInfoTypeChange);
	}
})();