(function () {
	'use strict';
	angular.module('app').controller('edRoomProfileCtrl', edRoomProfileCtrl);

	edRoomProfileCtrl.$inject = ['$scope', '$document', 'edRoomService', '$stateParams'];

	function edRoomProfileCtrl($scope, $document, edRoomService, $stateParams) {
		var vm = this;
		vm.selectedRooms = edRoomService.getSelectedRooms();
		vm.changePage = changePage;
		vm.currentPage = edRoomService.getProfilePageNumber();

		edRoomService.setDisplayRoomInfoType('profile');
		edRoomService.setSelectMultipleRooms(true);
		edRoomService.updateMappedRoom(null);

		if ($stateParams.room) {
			edRoomService.getAllRooms().$promise.then(selectRoom);
		}

		function selectRoom(rooms) {
			var selectedRooms = rooms.filter(function (room) {
				var match = false;
				if ($stateParams.room) {
					// Split name query on comma
					var names = $stateParams.room.split(',');
					// Loop over each first name
					angular.forEach(names, function (name) {
						// If the room's name is part of the query check the last names
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