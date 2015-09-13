(function () {
	'use strict';
	angular.module('app').factory('edEmployeeService', edEmployeeService);

	edEmployeeService.$inject = ['$rootScope', '$q', 'edCachedEmployeeResourceService', 'edEmployeeResourceService', 'Upload', 'edNotifierService'];

	function edEmployeeService($rootScope, $q, edCachedEmployeeResourceService, edEmployeeResourceService, Upload, edNotifierService) {
		var selectedEmployees = [];
		var mappedEmployee = null;
		var selectMultipleEmployees = false;
		var displayEmployeeInfoType = 'profile';
		var service = {
			selectedEmployees: selectedEmployees,
			selectMultipleEmployees: selectMultipleEmployees,
			getAllEmployees: getAllEmployees,
			getSelectedEmployees: getSelectedEmployees,
			addAllFilteredEmployees: addAllFilteredEmployees,
			updateSelectedEmployees: updateSelectedEmployees,
			removeAllSelectedEmployees: removeAllSelectedEmployees,
			setSelectMultipleEmployees: setSelectMultipleEmployees,
			getSelectMultipleEmployees: getSelectMultipleEmployees,
			updateEmployee: updateEmployee,
			createEmployee: createEmployee,
			uploadEmployeePhoto: uploadEmployeePhoto,
			updateMappedEmployee: updateMappedEmployee,
			getMappedEmployee: getMappedEmployee,
			setDisplayEmployeeInfoType: setDisplayEmployeeInfoType,
			getDisplayEmployeeInfoType: getDisplayEmployeeInfoType
		};
		return service;

		/**
		 * Gets all employees from the database (or memory)
		 *
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
			// Broadcast event for listeners
			$rootScope.$broadcast('selectedEmployeeChange', selectedEmployees);
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
					// This employee was already selected, so remove them (and deselect them in the list)
				} else {
					employee.selected = false;
					selectedEmployees.splice(selectedEmployees.indexOf(employee), 1);
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
					// This employee was already selected, so remove them
				} else {
					employee.selected = false;
					selectedEmployees = [];
				}
			}
			// Broadcast event for listeners
			$rootScope.$broadcast('selectedEmployeeChange', selectedEmployees);
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
			$rootScope.$broadcast('selectedEmployeeChange', selectedEmployees);
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
		 * Gets wether or not we should allow multiple employees to be selected
		 *
		 * @return {Boolean} allow selecting multiple employee
		 */
		function getSelectMultipleEmployees() {
			return selectMultipleEmployees;
		}

		/**
		 * Updates employee record in database
		 * Uses the selected employee for updating
		 *
		 * @param {Object} newEmployeeData employee data to update
		 * @return {Object} promise
		 */
		function updateEmployee(newEmployeeData) {
			var dfd = $q.defer();
			var clone = angular.copy(selectedEmployees[0]);
			angular.extend(clone, newEmployeeData);
			clone.$update().then(function (employee) {
				removeAllSelectedEmployees();
				$rootScope.$broadcast('employeesUpdated', getAllEmployees(true));
				dfd.resolve(employee);
			}, function (response) {
				dfd.reject(response.data.reason);
			});
			return dfd.promise;
		}

		/**
		 * Create employee record in database
		 *
		 * @param {Object} newEmployeeData employee data to insert
		 * @return {Object} promise
		 */
		function createEmployee(newEmployeeData) {
			var newEmployee = new edEmployeeResourceService(newEmployeeData);
			var dfd = $q.defer();

			newEmployee.$save().then(function (employee) {
				dfd.resolve(employee);
			}, function (response) {
				dfd.reject(response.data.reason);
			});
			return dfd.promise;
		}

		/**
		 * Upload employee photo to disk
		 *
		 * @param {Object} employeePhoto employee photo data
		 * @param {Object} employeeData employee data
		 */
		function uploadEmployeePhoto(employeePhoto, employeeData) {
			Upload.upload({
				url: 'api/employees/uploadphoto',
				file: employeePhoto,
				fileName: employeeData._id + '.' + employeePhoto.name.split('.').pop()
			}).success(function (data) {
				if (data.reason) {
					edNotifierService.error(data.reason);
				}
			}).error(function () {
				// something went wrong
			});
		}
	}
})();
