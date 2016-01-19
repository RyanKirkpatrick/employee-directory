(function () {
	'use strict';
	angular.module('app').controller('edRoomProfileCtrl', edRoomProfileCtrl);

	edRoomProfileCtrl.$inject = ['$scope', '$document', 'edRoomService', '$stateParams', 'edSidebarService', '_'];

	function edRoomProfileCtrl($scope, $document, edRoomService, $stateParams, edSidebarService, _) {
		var vm = this;
		vm.selectedRooms = edRoomService.getSelectedRooms();
		vm.changePage = changePage;
		vm.currentPage = edRoomService.getProfilePageNumber();

		activate();

		function activate() {
			edSidebarService.setLockSidebar(false);
			edRoomService.setDisplayRoomInfoType('profile');
			edRoomService.setSelectMultipleRooms(true);
			edRoomService.updateMappedRoom(null);

			if ($stateParams.room || $stateParams.roomtype) {
				edRoomService.removeAllSelectedRooms();
				if ($stateParams.room) {
					edRoomService.getAllRooms().$promise.then(selectRoomByName);
				} else if ($stateParams.roomtype) {
					edRoomService.removeAllSelectedRooms();
					edRoomService.getAllRooms().$promise.then(selectRoomByType);
				}
			}
		}

		function selectRoomByName(rooms) {
			var selectedRooms = _.filter(rooms, function (room) {
				var match = false;
				if ($stateParams.room) {
					// Split name query on comma
					var rooms = $stateParams.room.split(',');
					// Loop over each room name
					angular.forEach(rooms, function (name) {
						// If the room's name is part of the query select it
						if (room.name.toLocaleLowerCase() === name.toLowerCase()) {
							match = true;
						} else {
							return false;
						}
					});
				}
				return match;
			});

			angular.forEach(selectedRooms, function (room) {
				edRoomService.updateSelectedRooms(room);
			});
		}

		function selectRoomByType(rooms) {
			var selectedRooms = _.sortBy(_.filter(rooms, function (room) {
				var match = false;
				if ($stateParams.roomtype) {
					// Split roomtype query on comma
					var roomtypes = $stateParams.roomtype.split(',');
					// Loop over each roomtype
					angular.forEach(roomtypes, function (type) {
						// If the room's type is part of the query select it
						if (room.type.toLocaleLowerCase() === type.toLowerCase()) {
							match = true;
						} else {
							return false;
						}
					});
				}
				return match;
			}), 'name').reverse();

			angular.forEach(selectedRooms, function (room) {
				edRoomService.updateSelectedRooms(room);
			});
		}

		function changePage(newPageNumber) {
			edRoomService.setProfilePageNumber(newPageNumber);
			$document.scrollTopAnimated(0, 300);
		}

		var deregister = $scope.$on('selectedRoomChange', function (event, selectedRooms) {
			vm.selectedRooms = selectedRooms;
			// If we added to selected rooms, go to first page and scroll to the top
			if (edRoomService.getSelectedRoomAdded()) {
				vm.currentPage = 1;
				$document.scrollTopAnimated(0, 300);
			}
		});

		$scope.$on('$destroy', deregister);
	}
})();