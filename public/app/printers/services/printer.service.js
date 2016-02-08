(function () {
	'use strict';
	angular.module('app').factory('edPrinterService', edPrinterService);

	edPrinterService.$inject = ['$rootScope', 'edCachedPrinterResourceService'];

	function edPrinterService($rootScope, edCachedPrinterResourceService) {
		var selectedPrinters = [];
		var selectedPrinterAdded = false;
		var profilePageNumber = 1;
		var mappedPrinter = null;
		var selectMultiplePrinters = false;
		var displayPrinterInfoType = 'profile';
		var service = {
			getAllPrinters: getAllPrinters,
			getSelectedPrinters: getSelectedPrinters,
			addAllFilteredPrinters: addAllFilteredPrinters,
			updateSelectedPrinters: updateSelectedPrinters,
			removeAllSelectedPrinters: removeAllSelectedPrinters,
			setSelectMultiplePrinters: setSelectMultiplePrinters,
			getSelectMultiplePrinters: getSelectMultiplePrinters,
			updateMappedPrinter: updateMappedPrinter,
			getMappedPrinter: getMappedPrinter,
			setDisplayPrinterInfoType: setDisplayPrinterInfoType,
			getDisplayPrinterInfoType: getDisplayPrinterInfoType,
			getSelectedPrinterAdded: getSelectedPrinterAdded,
			setProfilePageNumber: setProfilePageNumber,
			getProfilePageNumber: getProfilePageNumber
		};
		return service;

		/**
		 * Gets all printers from the database (or memory)
		 *
		 * @return {Array} printers
		 */
		function getAllPrinters() {
			return edCachedPrinterResourceService.query();
		}

		/**
		 * Gets the selected printers
		 *
		 * @return {Array} selected printers
		 */
		function getSelectedPrinters() {
			return selectedPrinters;
		}

		/**
		 * Adds all the filtered printers to the selected printers
		 * Removes any unfiltered printers from selected printers
		 *
		 * @param {Array} printers to add to selected
		 * @return {Array} selected printers
		 */
		function addAllFilteredPrinters(printers) {
			angular.forEach(selectedPrinters, function (prevSelected) {
				prevSelected.selected = false;
			});
			angular.forEach(printers, function (printer) {
				printer.selected = true;
			});
			selectedPrinters = printers;
			selectedPrinterAdded = true;
			// Broadcast event for listeners
			$rootScope.$broadcast('selectedPrinterChange', selectedPrinters);
			return selectedPrinters;
		}

		/**
		 * Updates the mapped printer
		 *
		 * @param {Object} printer to map / un-map
		 * @return {Object} mapped printer
		 */
		function updateMappedPrinter(printer) {
			// Un-map the currently mapped printer
			if (!printer && mappedPrinter) {
				mappedPrinter.mapped = false;
				mappedPrinter = null;
				// Un-map the currently mapped printer and (possibly) map the new one
			} else if (printer && mappedPrinter) {
				mappedPrinter.mapped = false;
				// Map the new printer
				if (mappedPrinter._id !== printer._id) {
					printer.mapped = true;
					mappedPrinter = printer;
					// Just remove the currently mapped printer
				} else {
					mappedPrinter = null;
				}
				// Map the requested printer (none currently mapped)
			} else if (printer && !mappedPrinter) {
				printer.mapped = true;
				mappedPrinter = printer;
			}
			$rootScope.$broadcast('mappedPrinterChange', mappedPrinter);
			return mappedPrinter;
		}

		/**
		 * Gets the mapped printer
		 *
		 * @return {Object} mapped printer
		 */
		function getMappedPrinter() {
			return mappedPrinter;
		}

		/**
		 * Sets the type of info to display
		 *
		 * @param {String} infoType type of info we want to deal with
		 * @return {String} type of info we want to deal with
		 */
		function setDisplayPrinterInfoType(infoType) {
			displayPrinterInfoType = infoType;
			$rootScope.$broadcast('displayPrinterInfoTypeChange', displayPrinterInfoType);
			return displayPrinterInfoType;
		}

		/**
		 * Gets the type of info to display
		 *
		 * @return {String} type of info we should deal with
		 */
		function getDisplayPrinterInfoType() {
			return displayPrinterInfoType;
		}

		/**
		 * Updates the array of selected printers
		 *
		 * @param {Object} printer the printer to add / remove from selected printers
		 * @return {Array} selected printers
		 */
		function updateSelectedPrinters(printer) {
			// Allowed to have multiple printers selected
			if (selectMultiplePrinters) {
				// This printer is not already selected, so add them (and select them in the list)
				if (!printer.selected) {
					printer.selected = true;
					selectedPrinters.unshift(printer);
					selectedPrinterAdded = true;
					// This printer was already selected, so remove them (and deselect them in the list)
				} else {
					printer.selected = false;
					selectedPrinters.splice(selectedPrinters.indexOf(printer), 1);
					selectedPrinterAdded = false;
				}
				// NOT allowed to have multiple printers selected
			} else {
				// This printer is not already selected, so add them and removed (and deselected) everyone else
				if (!printer.selected) {
					// set all selected printer's selected property to false
					angular.forEach(selectedPrinters, function (prevSelected) {
						prevSelected.selected = false;
					});
					// Set this printer's selected property to true
					printer.selected = true;
					// replace the array of selected printers with just this one printer
					selectedPrinters = [printer];
					selectedPrinterAdded = true;
					// This printer was already selected, so remove them
				} else {
					printer.selected = false;
					selectedPrinters = [];
					selectedPrinterAdded = false;
				}
			}
			// Broadcast event for listeners
			$rootScope.$broadcast('selectedPrinterChange', selectedPrinters);
			return selectedPrinters;
		}

		/**
		 * Removes all selected printers
		 */
		function removeAllSelectedPrinters() {
			angular.forEach(selectedPrinters, function (prevSelected) {
				prevSelected.selected = false;
			});
			selectedPrinters = [];
			selectedPrinterAdded = false;
			$rootScope.$broadcast('selectedPrinterChange', selectedPrinters);
		}

		/**
		 * Returns if a selected printer was added (true) or removed (false)
		 *
		 * @return {Boolean} selected printers added
		 */
		function getSelectedPrinterAdded() {
			return selectedPrinterAdded;
		}

		/**
		 * Sets the current page number of the printer profiles
		 *
		 * @param {Number} pageNumber current page number on printer profiles
		 */
		function setProfilePageNumber(pageNumber) {
			profilePageNumber = pageNumber;
		}

		/**
		 * Returns the printer profile page number
		 *
		 * @return {Number} printer profile page number
		 */
		function getProfilePageNumber() {
			return profilePageNumber;
		}

		/**
		 * Sets the ability to select more than one printer at a time
		 *
		 * @param {Boolean} selectMultiple allowed to select multiple printers
		 * @return {Array} selected printers
		 */
		function setSelectMultiplePrinters(selectMultiple) {
			selectMultiplePrinters = selectMultiple;
			// If there are multiple selected printers, remove all but the last one added
			if (!selectMultiple && selectedPrinters.length > 1) {
				var lastSelectedPrinter = selectedPrinters.shift();
				// This printer will be reselected in updateSelectedPrinters
				lastSelectedPrinter.selected = false;
				selectedPrinters = updateSelectedPrinters(lastSelectedPrinter);
			}
			$rootScope.$broadcast('selectMultiplePrintersChange', selectMultiplePrinters);
			return selectedPrinters;
		}

		/**
		 * Gets whether or not we should allow multiple printers to be selected
		 *
		 * @return {Boolean} allow selecting multiple printer
		 */
		function getSelectMultiplePrinters() {
			return selectMultiplePrinters;
		}
	}
})();
