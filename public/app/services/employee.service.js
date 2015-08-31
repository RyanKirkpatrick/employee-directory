(function () {
	'use strict';
	angular.module('app').factory('edEmployeeService', edEmployeeService);

	edEmployeeService.$inject = ['$rootScope', '$q', 'edCachedEmployeeResourceService', 'edEmployeeResourceService', 'Upload', 'edNotifierService'];

	function edEmployeeService($rootScope, $q, edCachedEmployeeResourceService, edEmployeeResourceService, Upload, edNotifierService) {
		var selectedEmployees = [];
		var selectMultipleEmployees = false;
		var service = {
			selectedEmployees: selectedEmployees,
			selectMultipleEmployees: selectMultipleEmployees,
			getAllEmployees: getAllEmployees,
			getSelectedEmployees: getSelectedEmployees,
			updateSelectedEmployees: updateSelectedEmployees,
			removeAllSelectedEmployees: removeAllSelectedEmployees,
			setSelectMultipleEmployees: setSelectMultipleEmployees,
			getSelectMultipleEmployees: getSelectMultipleEmployees,
			updateEmployee: updateEmployee,
			createEmployee: createEmployee,
			uploadEmployeePhoto: uploadEmployeePhoto
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
