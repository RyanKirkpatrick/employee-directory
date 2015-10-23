(function () {
	'use strict';
	angular.module('app').controller('edRoomSelectorCtrl', edRoomSelectorCtrl);

	edRoomSelectorCtrl.$inject = ['$scope', '$document', 'edRoomService', 'edEmployeeService', 'edPrinterService'];

	function edRoomSelectorCtrl($scope, $document, edRoomService, edEmployeeService, edPrinterService) {
		var vm = this;
		vm.rooms = edRoomService.getAllRooms();
		vm.selectedRooms = edRoomService.getSelectedRooms();
		vm.displayRoomInfoType = edRoomService.getDisplayRoomInfoType();
		vm.selectRoom = selectRoom;
		vm.selectAll = selectAll;
		vm.selectNone = selectNone;
		vm.allowSelectAll = edRoomService.getSelectMultipleRooms();
		vm.filteredEmployees = edRoomService.getAllRooms();
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

		function selectRoom(room) {
			if (vm.displayRoomInfoType === 'profile') {
				vm.selectedRooms = edRoomService.updateSelectedRooms(room);
			}
			else if (vm.displayRoomInfoType === 'location') {
				// Only allow 1 thing to be mapped at a time
				edEmployeeService.updateMappedEmployee(null);
				edPrinterService.updateMappedPrinter(null);
				edRoomService.updateMappedRoom(room);
			}
		}

		function filterLocations(location) {
			if (vm.location[location]) {
				vm.locations.push(location);
			} else {
				vm.locations.splice(vm.locations.indexOf(location), 1);
			}
		}

		function locationFilter(room) {
			if (vm.locations.length > 0) {
				if (room.location) {
					return vm.locations.indexOf(room.location) > -1;
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

		function floorFilter(room) {
			if (!nycOnly()) {
				if (vm.floors.length > 0) {
					if (room.floor) {
						return vm.floors.indexOf(room.floor) > -1 && room.location === 'buf';
					}
				} else {
					return true;
				}
			} else {
				return true;
			}
		}

		function selectAll() {
			vm.selectedRooms = edRoomService.addAllFilteredRooms(vm.filteredRooms);
			$document.scrollTopAnimated(0, 300);
		}

		function selectNone() {
			vm.selectedRooms = edRoomService.removeAllSelectedRooms();
		}

		function clearFilter() {
			vm.roomName = '';
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
			vm.type = '';
		}

		var deregisterSelectMultipleRoomsChange = $scope.$on('selectMultipleRoomsChange', function (event, allowSelectMultipleRooms) {
			vm.allowSelectAll = allowSelectMultipleRooms;
		});

		$scope.$on('$destroy', deregisterSelectMultipleRoomsChange);

		var deregisterDisplayRoomInfoTypeChange = $scope.$on('displayRoomInfoTypeChange', function (event, displayRoomInfoType) {
			vm.displayRoomInfoType = displayRoomInfoType;
		});

		$scope.$on('$destroy', deregisterDisplayRoomInfoTypeChange);
	}
})();