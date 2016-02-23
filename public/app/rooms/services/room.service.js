(function () {
	'use strict';
	angular.module('app').factory('edRoomService', edRoomService);

	edRoomService.$inject = ['$rootScope', 'edCachedRoomResourceService'];

	function edRoomService($rootScope, edCachedRoomResourceService) {
		var selectedRooms = [];
		var selectedRoomAdded = false;
		var profilePageNumber = 1;
		var mappedRoom = null;
		var selectMultipleRooms = false;
		var displayRoomInfoType = 'profile';
		var service = {
			getAllRooms: getAllRooms,
			getSelectedRooms: getSelectedRooms,
			addAllFilteredRooms: addAllFilteredRooms,
			updateSelectedRooms: updateSelectedRooms,
			removeAllSelectedRooms: removeAllSelectedRooms,
			setSelectMultipleRooms: setSelectMultipleRooms,
			getSelectMultipleRooms: getSelectMultipleRooms,
			updateMappedRoom: updateMappedRoom,
			getMappedRoom: getMappedRoom,
			setDisplayRoomInfoType: setDisplayRoomInfoType,
			getDisplayRoomInfoType: getDisplayRoomInfoType,
			getSelectedRoomAdded: getSelectedRoomAdded,
			setProfilePageNumber: setProfilePageNumber,
			getProfilePageNumber: getProfilePageNumber
		};
		return service;

		/**
		 * Gets all pooms from the database (or memory)
		 *
		 * @return {Array} rooms
		 */
		function getAllRooms() {
			return edCachedRoomResourceService.query();
		}

		/**
		 * Gets the selected rooms
		 *
		 * @return {Array} selected rooms
		 */
		function getSelectedRooms() {
			return selectedRooms;
		}

		/**
		 * Adds all the filtered rooms to the selected rooms
		 * Removes any unfiltered rooms from selected rooms
		 *
		 * @param {Array} rooms to add to selected
		 * @return {Array} selected rooms
		 */
		function addAllFilteredRooms(rooms) {
			angular.forEach(selectedRooms, function (prevSelected) {
				prevSelected.selected = false;
			});
			angular.forEach(rooms, function (room) {
				room.selected = true;
			});
			selectedRooms = rooms;
			selectedRoomAdded = true;
			// Broadcast event for listeners
			$rootScope.$broadcast('selectedRoomsChange', selectedRooms);
			return selectedRooms;
		}

		/**
		 * Updates the mapped room
		 *
		 * @param {Object} room to map / un-map
		 * @return {Object} mapped room
		 */
		function updateMappedRoom(room) {
			// Un-map the currently mapped room
			if (!room && mappedRoom) {
				mappedRoom.mapped = false;
				mappedRoom = null;
				// Un-map the currently mapped room and (possibly) map the new one
			} else if (room && mappedRoom) {
				mappedRoom.mapped = false;
				// Map the new room
				if (mappedRoom._id !== room._id) {
					room.mapped = true;
					mappedRoom = room;
					// Just remove the currently mapped room
				} else {
					mappedRoom = null;
				}
				// Map the requested room (none currently mapped)
			} else if (room && !mappedRoom) {
				room.mapped = true;
				mappedRoom = room;
			}
			$rootScope.$broadcast('mappedRoomChange', mappedRoom);
			return mappedRoom;
		}

		/**
		 * Gets the mapped room
		 *
		 * @return {Object} mapped room
		 */
		function getMappedRoom() {
			return mappedRoom;
		}

		/**
		 * Sets the type of info to display
		 *
		 * @param {String} infoType type of info we want to deal with
		 * @return {String} type of info we want to deal with
		 */
		function setDisplayRoomInfoType(infoType) {
			displayRoomInfoType = infoType;
			$rootScope.$broadcast('displayRoomInfoTypeChange', displayRoomInfoType);
			return displayRoomInfoType;
		}

		/**
		 * Gets the type of info to display
		 *
		 * @return {String} type of info we should deal with
		 */
		function getDisplayRoomInfoType() {
			return displayRoomInfoType;
		}

		/**
		 * Updates the array of selected rooms
		 *
		 * @param {Object} room the room to add / remove from selected rooms
		 * @return {Array} selected rooms
		 */
		function updateSelectedRooms(room) {
			// Allowed to have multiple rooms selected
			if (selectMultipleRooms) {
				// This room is not already selected, so add them (and select them in the list)
				if (!room.selected) {
					room.selected = true;
					selectedRooms.unshift(room);
					selectedRoomAdded = true;
					// This room was already selected, so remove them (and deselect them in the list)
				} else {
					room.selected = false;
					selectedRooms.splice(selectedRooms.indexOf(room), 1);
					selectedRoomAdded = false;
				}
				// NOT allowed to have multiple rooms selected
			} else {
				// This room is not already selected, so add them and removed (and deselected) everyone else
				if (!room.selected) {
					// set all selected room's selected property to false
					angular.forEach(selectedRooms, function (prevSelected) {
						prevSelected.selected = false;
					});
					// Set this room's selected property to true
					room.selected = true;
					// replace the array of selected rooms with just this one room
					selectedRooms = [room];
					selectedRoomAdded = true;
					// This room was already selected, so remove them
				} else {
					room.selected = false;
					selectedRooms = [];
					selectedRoomAdded = false;
				}
			}
			// Broadcast event for listeners
			$rootScope.$broadcast('selectedRoomsChange', selectedRooms);
			return selectedRooms;
		}

		/**
		 * Removes all selected rooms
		 */
		function removeAllSelectedRooms() {
			angular.forEach(selectedRooms, function (prevSelected) {
				prevSelected.selected = false;
			});
			selectedRooms = [];
			selectedRoomAdded = false;
			$rootScope.$broadcast('selectedRoomsChange', selectedRooms);
		}

		/**
		 * Returns if a selected room was added (true) or removed (false)
		 *
		 * @return {Boolean} selected rooms added
		 */
		function getSelectedRoomAdded() {
			return selectedRoomAdded;
		}

		/**
		 * Sets the current page number of the room profiles
		 *
		 * @param {Number} pageNumber current page number on room profiles
		 */
		function setProfilePageNumber(pageNumber) {
			profilePageNumber = pageNumber;
		}

		/**
		 * Returns the room profile page number
		 *
		 * @return {Number} room profile page number
		 */
		function getProfilePageNumber() {
			return profilePageNumber;
		}

		/**
		 * Sets the ability to select more than one room at a time
		 *
		 * @param {Boolean} selectMultiple allowed to select multiple rooms
		 * @return {Array} selected rooms
		 */
		function setSelectMultipleRooms(selectMultiple) {
			selectMultipleRooms = selectMultiple;
			// If there are multiple selected rooms, remove all but the last one added
			if (!selectMultiple && selectedRooms.length > 1) {
				var lastSelectedRoom = selectedRooms.shift();
				// This room will be reselected in updateSelectedRooms
				lastSelectedRoom.selected = false;
				selectedRooms = updateSelectedRooms(lastSelectedRoom);
			}
			$rootScope.$broadcast('selectMultipleRoomsChange', selectMultipleRooms);
			return selectedRooms;
		}

		/**
		 * Gets wether or not we should allow multiple rooms to be selected
		 *
		 * @return {Boolean} allow selecting multiple room
		 */
		function getSelectMultipleRooms() {
			return selectMultipleRooms;
		}
	}
})();
