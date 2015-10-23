(function () {
	'use strict';
	angular.module('app').controller('edCreateEmployeeCtrl', edCreateEmployeeCtrl);

	edCreateEmployeeCtrl.$inject = ['edNotifierService', 'edEmployeeService', 'edDeskService', 'edSidebarService', 'edEmployeeAdminService'];

	function edCreateEmployeeCtrl(edNotifierService, edEmployeeService, edDeskService, edSidebarService, edEmployeeAdminService) {
		var vm = this;
		vm.createEmployee = createEmployee;
		vm.desks = edDeskService.getAllDesks();
		vm.managers = null;
		vm.newEmployee = {};
		vm.locationOptions = [
			{
				value: 'buf',
				text: 'Buffalo'
			},
			{
				value: 'nyc',
				text: 'NYC'
			},
			{
				value: 'oth',
				text: 'Remote'
			}
		];

		activate();

		function activate() {
			resetForm();
			edSidebarService.setLockSidebar(true);
			edEmployeeService.getAllEmployees().$promise.then(createManagerList);
		}

		function resetForm() {
			vm.newEmployee = {
				eid: '',
				firstName: '',
				lastName: '',
				nickName: '',
				email: '',
				phone: '',
				ext: '',
				department: '',
				title: '',
				team: '',
				location: '',
				floor: '',
				seat: '',
				hasReports: '',
				mid: ''
			};
		}

		function createManagerList(employees) {
			vm.managers = employees.filter(function (employee) {
				return employee.hasReports === true;
			});
		}

		function createEmployee() {
			var newEmployeeData = {
				eid: vm.newEmployee.eid,
				firstName: vm.newEmployee.firstName,
				lastName: vm.newEmployee.lastName,
				nickName: vm.newEmployee.nickName,
				email: vm.newEmployee.email,
				phone: vm.newEmployee.phone,
				ext: vm.newEmployee.ext,
				department: vm.newEmployee.department,
				title: vm.newEmployee.title,
				team: vm.newEmployee.team,
				location: vm.newEmployee.location,
				floor: vm.newEmployee.floor,
				seat: vm.newEmployee.seat,
				hasReports: vm.newEmployee.hasReports,
				mid: vm.newEmployee.mid
			};

			edEmployeeAdminService.createEmployee(newEmployeeData).then(function (employee) {
				edNotifierService.notify('New Employee Added!');
				// upload the employee photo if there is one
				if (vm.newEmployee.image) {
					edEmployeeAdminService.uploadEmployeePhoto(vm.newEmployee.image, employee);
					// Now update the employee record in the DB with the correct filename
					// update the selected employee to add so we can update them
					edEmployeeService.updateSelectedEmployees(employee);
					newEmployeeData.image = employee._id + '.' + vm.newEmployee.image.name.split('.').pop().toLowerCase();
					edEmployeeAdminService.updateEmployee(newEmployeeData).then(function (employee) {
						//photo upload successful
					}, function () {
						edNotifierService.error('Employee Photo Not Added.');
					});
				}
				resetForm();
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();
