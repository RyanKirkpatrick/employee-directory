(function () {
	'use strict';
	angular.module('app').controller('edRoomTopbarCtrl', edRoomTopbarCtrl);

	edRoomTopbarCtrl.$inject = ['$scope', 'edRoomService'];

	function edRoomTopbarCtrl($scope, edRoomService) {
		var vm = this;
		vm.selectedRooms = edRoomService.getSelectedRooms();

		var deregisterSelectedRoomsChanged = $scope.$on('selectedRoomsChange', function (event, selectedRooms) {
			vm.selectedRooms = selectedRooms;
		});

		$scope.$on('$destroy', deregisterSelectedRoomsChanged);
	}
})();