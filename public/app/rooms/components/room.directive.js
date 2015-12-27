(function () {
	'use strict';
	angular.module('app').directive('edRoom', edRoom);

	edRoom.$inject = ['$stateParams', '$document', '$timeout', 'edRoomService'];

	function edRoom($stateParams, $document, $timeout, edRoomService) {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/rooms/components/room',
			replace: true,
			scope: {
				name: '@',
				seat: '@',
				number: '@',
				classification: '@',
				xpos: '@',
				ypos: '@'
			},
			link: linkFunc,
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;

		function linkFunc(scope, el, attrs) {
			scope.mappedRoom = edRoomService.getMappedRoom();

			if ($stateParams.name === attrs.name && scope.mappedRoom) {
				$timeout(function () {
					$document.scrollToElement(el, 300, 300).then(function () {
						el.addClass('mapped').append('<div class="marker"><div class="pulse"></div><div class="pin"></div></div>');
					});
				}, 800);
			} else {
				el.removeClass('mapped').find('.marker').remove();
			}

			var deregister = scope.$on('mappedRoomChange', function (event, mappedRoom) {
				if (mappedRoom && mappedRoom.name === attrs.name) {
					$timeout(function () {
						$document.scrollToElement(el, 300, 300).then(function () {
							el.addClass('mapped').append('<div class="marker"><div class="pulse"></div><div class="pin"></div></div>');
						});
					}, 100);
				} else {
					el.removeClass('mapped').find('.marker').remove();
				}
			});

			scope.$on('$destroy', deregister);
		}
	}

	ctrlFunc.$inject = ['$state', 'edRoomService', 'edNotifierService', 'edEmployeeService', 'edPrinterService', '_'];

	function ctrlFunc($state, edRoomService, edNotifierService, edEmployeeService, edPrinterService, _) {
		var vm = this;
		vm.mapRoom = mapRoom;
		vm.viewProfile = viewProfile;
		vm.rooms = edRoomService.getAllRooms();
		vm.mappedRoom = null;

		function mapRoom(name) {
			var mappedRoomArray = _.filter(vm.rooms, function (room) {
				return room.name === name;
			});

			if (mappedRoomArray.length > 0) {
				// Only allow 1 thing to be mapped at a time
				edEmployeeService.updateMappedEmployee(null);
				edPrinterService.updateMappedPrinter(null);
				vm.mappedRoom = edRoomService.updateMappedRoom(mappedRoomArray[0]);
			} else {
				edNotifierService.error('Sorry, I don\'t know this room.');
			}
		}

		function viewProfile(seat) {
			var selectedRoom = _.filter(vm.rooms, function (room) {
				return room.seat === seat;
			});
			edRoomService.removeAllSelectedRooms();
			edRoomService.updateSelectedRooms(selectedRoom[0]);
			$state.go('rooms.profile.name', {'room': selectedRoom[0].name});
		}
	}
})();