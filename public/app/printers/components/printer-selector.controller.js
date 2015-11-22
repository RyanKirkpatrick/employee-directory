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
		vm.locationFilter = locationFilter;
		vm.filterLocations = filterLocations;
		vm.location = {
			'buf': false,
			'nyc': false
		};
		vm.locations = [];
		vm.nycOnly = nycOnly;
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

		function filterLocations(location) {
			if (vm.location[location]) {
				vm.locations.push(location);
			} else {
				vm.locations.splice(vm.locations.indexOf(location), 1);
			}
		}

		function locationFilter(printer) {
			if (vm.locations.length > 0) {
				if (printer.location) {
					return vm.locations.indexOf(printer.location) > -1;
				}
			} else {
				return true;
			}
		}

		function nycOnly() {
			return vm.locations.length === 1 && vm.locations[0] === 'nyc';
		}

		function filterFloors(floor) {
			if (vm.floor[floor]) {
				vm.floors.push(floor);
			} else {
				vm.floors.splice(vm.floors.indexOf(floor), 1);
			}
		}

		function floorFilter(printer) {
			// Only use the floor filter if NYC is not the only location selected
			if (!nycOnly()) {
				// If a floor(s) has been selected
				if (vm.floors.length > 0) {
					// If the printer is on a floor in BUF
					if (printer.floor && printer.location === 'buf') {
						// Include this printer if they are on the selected floor (in BUF)
						return vm.floors.indexOf(printer.floor) > -1;
						// Include this printer if NYC is also a selected location
					} else if (vm.locations.indexOf('nyc') > -1) {
						return true;
					}
					// Include all filtered printer if no floor is selected
				} else {
					return true;
				}
				// Include all filtered printer if NYC is the only location selected
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
			vm.locations = [];
			vm.location = {
				'buf': false,
				'nyc': false
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