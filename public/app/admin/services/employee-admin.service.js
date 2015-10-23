(function () {
	'use strict';
	angular.module('app').factory('edEmployeeAdminService', edEmployeeAdminService);

	edEmployeeAdminService.$inject = ['$rootScope', '$q', 'edEmployeeService', 'edEmployeeResourceService', 'Upload'];

	function edEmployeeAdminService($rootScope, $q, edEmployeeService, edEmployeeResourceService, Upload) {
		var service = {
			updateEmployee: updateEmployee,
			createEmployee: createEmployee,
			uploadEmployeePhoto: uploadEmployeePhoto
		};
		return service;

		/**
		 * Updates employee record in database
		 * Uses the selected employee for updating
		 *
		 * @param {Object} newEmployeeData employee data to update
		 * @return {Object} promise
		 */
		function updateEmployee(newEmployeeData) {
			var dfd = $q.defer();
			var selectedEmployees = edEmployeeService.getSelectedEmployees();
			var clone = angular.copy(selectedEmployees[0]);
			angular.extend(clone, newEmployeeData);
			clone.$update().then(function (employee) {
				edEmployeeService.removeAllSelectedEmployees();
				$rootScope.$broadcast('employeesUpdated', edEmployeeService.getAllEmployees(true));
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
				edEmployeeService.removeAllSelectedEmployees();
				$rootScope.$broadcast('employeesUpdated', edEmployeeService.getAllEmployees(true));
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
				data: {
					file: employeePhoto,
					fileName: employeeData._id + '.' + employeePhoto.name.split('.').pop()
				}
			}).then(function (resp) {
				console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
			}, function (resp) {
				console.log('Error status: ' + resp.status);
			}, function (evt) {
				var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
				console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
			});
		}
	}
})();