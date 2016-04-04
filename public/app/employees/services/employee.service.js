(function () {
	'use strict';
	angular.module('app').factory('edEmployeeService', edEmployeeService);

	edEmployeeService.$inject = ['$rootScope', 'edCachedEmployeeResourceService', 'edNotifierService', '_', 'moment'];

	function edEmployeeService($rootScope, edCachedEmployeeResourceService, edNotifierService, _, moment) {
		var selectedEmployees = [];
		var selectedEmployeeAdded = false;
		var profilePageNumber = 1;
		var mappedEmployee = null;
		var selectMultipleEmployees = false;
		var displayEmployeeInfoType = 'profile';
		var service = {
			getAllEmployees: getAllEmployees,
			getSelectedEmployees: getSelectedEmployees,
			addAllFilteredEmployees: addAllFilteredEmployees,
			updateSelectedEmployees: updateSelectedEmployees,
			removeAllSelectedEmployees: removeAllSelectedEmployees,
			setSelectMultipleEmployees: setSelectMultipleEmployees,
			getSelectMultipleEmployees: getSelectMultipleEmployees,
			updateMappedEmployee: updateMappedEmployee,
			updateMappedEmployeeById: updateMappedEmployeeById,
			getMappedEmployee: getMappedEmployee,
			setDisplayEmployeeInfoType: setDisplayEmployeeInfoType,
			getDisplayEmployeeInfoType: getDisplayEmployeeInfoType,
			getSelectedEmployeeAdded: getSelectedEmployeeAdded,
			setProfilePageNumber: setProfilePageNumber,
			getProfilePageNumber: getProfilePageNumber,
			filterEmployeesByBirthday: filterEmployeesByBirthday
		};
		return service;

		/**
		 * Gets all employees from the database (or memory)
		 *
		 * @param {Boolean} cacheBust to get data from server or memory
		 * @return {Array} employees
		 */
		function getAllEmployees(cacheBust) {
			return edCachedEmployeeResourceService.query(cacheBust);
		}

		/**
		 * Gets the selected employees
		 *
		 * @return {Array} selected employees
		 */
		function getSelectedEmployees() {
			return selectedEmployees;
		}

		/**
		 * Adds all the filtered employees to the selected employees
		 * Removes any unfiltered employees from selected employees
		 *
		 * @param {Array} employees to add to selected
		 * @return {Array} selected employees
		 */
		function addAllFilteredEmployees(employees) {
			angular.forEach(selectedEmployees, function (prevSelected) {
				prevSelected.selected = false;
			});
			angular.forEach(employees, function (employee) {
				employee.selected = true;
			});
			selectedEmployees = employees;
			selectedEmployeeAdded = true;
			// Broadcast event for listeners
			$rootScope.$broadcast('selectedEmployeesChange', selectedEmployees);
			return selectedEmployees;
		}

		/**
		 * Updates the mapped employee
		 *
		 * @param {Object} employee to map / un-map
		 * @return {Object} mapped employee
		 */
		function updateMappedEmployee(employee) {
			// Un-map the currently mapped employee
			if (!employee && mappedEmployee) {
				mappedEmployee.mapped = false;
				mappedEmployee = null;
				// Un-map the currently mapped employee and (possibly) map the new one
			} else if (employee && mappedEmployee) {
				mappedEmployee.mapped = false;
				// Map the new employee
				if (mappedEmployee._id !== employee._id) {
					employee.mapped = true;
					mappedEmployee = employee;
					// Just remove the currently mapped employee
				} else {
					mappedEmployee = null;
				}
				// Map the requested employee (none currently mapped)
			} else if (employee && !mappedEmployee) {
				employee.mapped = true;
				mappedEmployee = employee;
			}
			$rootScope.$broadcast('mappedEmployeeChange', mappedEmployee);
			return mappedEmployee;
		}

		/**
		 * Updates the mapped employee using an employee ID
		 */
		function updateMappedEmployeeById(id) {
			getAllEmployees().$promise.then(function (employees) {
				var employee = _.filter(employees, function (employee) {
					return employee.eid === parseInt(id);
				});
				if (employee.length > 0) {
					updateMappedEmployee(employee[0]);
				} else {
					edNotifierService.error('I\'m not sure who you\'re looking for.');
				}
			});
		}

		/**
		 * Gets the mapped employee
		 *
		 * @return {Object} mapped employee
		 */
		function getMappedEmployee() {
			return mappedEmployee;
		}

		/**
		 * Sets the type of info to display
		 *
		 * @param {String} infoType type of info we want to deal with
		 * @return {String} type of info we want to deal with
		 */
		function setDisplayEmployeeInfoType(infoType) {
			displayEmployeeInfoType = infoType;
			$rootScope.$broadcast('displayEmployeeInfoTypeChange', displayEmployeeInfoType);
			return displayEmployeeInfoType;
		}

		/**
		 * Gets the type of info to display
		 *
		 * @return {String} type of info we should deal with
		 */
		function getDisplayEmployeeInfoType() {
			return displayEmployeeInfoType;
		}

		/**
		 * Updates the array of selected employees
		 *
		 * @param {Object} employee the employee to add / remove from selected employees
		 * @return {Array} selected employees
		 */
		function updateSelectedEmployees(employee) {
			// Allowed to have multiple employees selected
			if (selectMultipleEmployees) {
				// This employee is not already selected, so add them (and select them in the list)
				if (!employee.selected) {
					employee.selected = true;
					selectedEmployees.unshift(employee);
					selectedEmployeeAdded = true;
					// This employee was already selected, so remove them (and deselect them in the list)
				} else {
					employee.selected = false;
					selectedEmployees.splice(selectedEmployees.indexOf(employee), 1);
					selectedEmployeeAdded = false;
				}
				// NOT allowed to have multiple employees selected
			} else {
				// This employee is not already selected, so add them and removed (and deselected) everyone else
				if (!employee.selected) {
					// set all selected employee's selected property to false
					angular.forEach(selectedEmployees, function (prevSelected) {
						prevSelected.selected = false;
					});
					// Set this employee's selected property to true
					employee.selected = true;
					// replace the array of selected employees with just this one employee
					selectedEmployees = [employee];
					selectedEmployeeAdded = true;
					// This employee was already selected, so remove them
				} else {
					employee.selected = false;
					selectedEmployees = [];
					selectedEmployeeAdded = false;
				}
			}
			// Broadcast event for listeners
			$rootScope.$broadcast('selectedEmployeesChange', selectedEmployees);
			return selectedEmployees;
		}

		/**
		 * Removes all selected employees
		 */
		function removeAllSelectedEmployees() {
			angular.forEach(selectedEmployees, function (prevSelected) {
				prevSelected.selected = false;
			});
			selectedEmployees = [];
			selectedEmployeeAdded = false;
			$rootScope.$broadcast('selectedEmployeesChange', selectedEmployees);
		}

		/**
		 * Returns if a selected employee was added (true) or removed (false)
		 *
		 * @return {Boolean} selected employees added
		 */
		function getSelectedEmployeeAdded() {
			return selectedEmployeeAdded;
		}

		/**
		 * Sets the current page number of the employee profiles
		 *
		 * @param {Number} pageNumber current page number on employee profiles
		 */
		function setProfilePageNumber(pageNumber) {
			profilePageNumber = pageNumber;
		}

		/**
		 * Returns the employee profile page number
		 *
		 * @return {Number} employee profile page number
		 */
		function getProfilePageNumber() {
			return profilePageNumber;
		}

		/**
		 * Sets the ability to select more than one employee at a time
		 *
		 * @param {Boolean} selectMultiple allowed to select multiple employees
		 * @return {Array} selected employees
		 */
		function setSelectMultipleEmployees(selectMultiple) {
			selectMultipleEmployees = selectMultiple;
			// If there are multiple selected employees, remove all but the last one added
			if (!selectMultiple && selectedEmployees.length > 1) {
				var lastSelectedEmployee = selectedEmployees.shift();
				// This employee will be reselected in updateSelectedEmployees
				lastSelectedEmployee.selected = false;
				selectedEmployees = updateSelectedEmployees(lastSelectedEmployee);
			}
			$rootScope.$broadcast('selectMultipleEmployeesChange', selectMultipleEmployees);
			return selectedEmployees;
		}

		/**
		 * Gets whether or not we should allow multiple employees to be selected
		 *
		 * @return {Boolean} allow selecting multiple employee
		 */
		function getSelectMultipleEmployees() {
			return selectMultipleEmployees;
		}

		/**
		 * Filters all employees who have a specified birthday
		 *
		 * @return {Array} birthdayEmployees
		 */
		function filterEmployeesByBirthday(employees, date) {
			return _.filter(employees, function (employee) {
				if (employee.birthdate && moment(employee.birthdate).date() === moment(date).date() && moment(employee.birthdate).month() === moment(date).month()) {
					return employee;
				}
			});
		}
	}
})();
