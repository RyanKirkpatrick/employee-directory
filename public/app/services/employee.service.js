(function () {
	'use strict';
	angular.module('app').factory('edEmployeeService', edEmployeeService);

	edEmployeeService.$inject = ['$rootScope', '$q', 'edEmployeeResourceService'];

	function edEmployeeService($rootScope, $q, edEmployeeResourceService) {
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
			updateEmployee: updateEmployee
		};
		return service;

		function getAllEmployees() {
			return edEmployeeResourceService.query();
		}

		function getSelectedEmployees() {
			return selectedEmployees;
		}

		function updateSelectedEmployees(employee) {
			// Allowed to have multiple employees selected
			if (selectMultipleEmployees) {
				// This employee is not already selected, so add them (and select them in the list)
				if (!employee.selected) {
					employee.selected = true;
					selectedEmployees.push(employee);
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

		function removeAllSelectedEmployees() {
			angular.forEach(selectedEmployees, function (prevSelected) {
				prevSelected.selected = false;
			});
			$rootScope.$broadcast('selectedEmployeeChange', selectedEmployees);
			selectedEmployees = [];
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
				var lastSelectedEmployee = selectedEmployees.pop();
				// This employee will be reslected in updateSelectedEmployees
				lastSelectedEmployee.selected = false;
				selectedEmployees = updateSelectedEmployees(lastSelectedEmployee);
			}
			return selectedEmployees;
		}

		function getSelectMultipleEmployees() {
			return selectMultipleEmployees;
		}

		/**
		 * Updates employee record in database
		 *
		 * @param {Object} newEmployeeData employee data to update
		 * @return {Object} promise
		 */
		function updateEmployee(newEmployeeData) {
			var dfd = $q.defer();
			var clone = angular.copy(selectedEmployees[0]);
			angular.extend(clone, newEmployeeData);
			clone.$update().then(function () {
				removeAllSelectedEmployees();
				$rootScope.$broadcast('employeesUpdated', getAllEmployees());
				dfd.resolve();
			}, function (response) {
				dfd.reject(response.data.reason);
			});
			return dfd.promise;
		}
	}
})();
