(function () {
	'use strict';
	angular.module('app').controller('edCreateEmployeeCtrl', edCreateEmployeeCtrl);

	edCreateEmployeeCtrl.$inject = ['$scope', 'edNotifierService', 'edEmployeeService', 'edDeskService', 'edSidebarService', 'edEmployeeAdminService', 'edIdentityService', '_'];

	function edCreateEmployeeCtrl($scope, edNotifierService, edEmployeeService, edDeskService, edSidebarService, edEmployeeAdminService, edIdentityService, _) {
		var vm = this;
		vm.identity = edIdentityService;
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
		vm.departments = [
			'Carrier Relations',
			'Client Service',
			'Client Service Management',
			'Configuration',
			'Corporate',
			'Development',
			'Employee Services',
			'Field Sales',
			'Finance',
			'HR',
			'Implementation',
			'Infrastructure / Tech Ops',
			'Marketing',
			'Product Strategy',
			'QA / Reporting / Billing'
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
				nickname: '',
				email: '',
				phone: '',
				ext: '',
				department: '',
				title: '',
				team: '',
				guilds: {},
				committees: {},
				location: '',
				floor: '',
				seat: '',
				hasReports: '',
				mid: ''
			};
		}

		function createManagerList(employees) {
			vm.managers = _.filter(employees, function (employee) {
				return employee.hasReports === true;
			});
		}

		var employeesUpdatedEvent = $scope.$on('employeesUpdated', function () {
			edEmployeeService.getAllEmployees().$promise.then(createManagerList);
		});

		$scope.$on('$destroy', employeesUpdatedEvent);

		function createEmployee() {
			var newEmployeeData = {
				eid: vm.newEmployee.eid,
				firstName: vm.newEmployee.firstName,
				lastName: vm.newEmployee.lastName,
				nickname: vm.newEmployee.nickname,
				email: vm.newEmployee.email,
				phone: vm.newEmployee.phone,
				ext: vm.newEmployee.ext,
				department: vm.newEmployee.department,
				title: vm.newEmployee.title,
				team: vm.newEmployee.team,
				guilds: [],
				committees: [],
				location: vm.newEmployee.location,
				floor: vm.newEmployee.floor,
				seat: vm.newEmployee.seat,
				hasReports: vm.newEmployee.hasReports,
				mid: vm.newEmployee.mid
			};

			// Add all the selected guilds
			_.forEach(vm.newEmployee.guilds, function (include, guild) {
				if (include) {
					newEmployeeData.guilds.push(guild);
				}
			});

			// Add all the selected committees
			_.forEach(vm.newEmployee.committees, function (include, committee) {
				if (include) {
					newEmployeeData.committees.push(committee);
				}
			});

			edEmployeeAdminService.createEmployee(newEmployeeData).then(function (employee) {
				edNotifierService.notify('New Employee Added!');
				// upload the employee photo if there is one
				if (vm.newEmployee.image) {
					edEmployeeAdminService.uploadEmployeePhoto(vm.newEmployee.image, employee);
					// Now update the employee record in the DB with the correct filename
					// update the selected employee to add so we can update them
					edEmployeeService.updateSelectedEmployees(employee);
					newEmployeeData.image = employee.eid + '.' + vm.newEmployee.image.name.split('.').pop().toLowerCase();
					edEmployeeAdminService.updateEmployee(newEmployeeData).then(function (employee) {
						//photo upload successful
					}, function () {
						edNotifierService.error('Employee Photo Not Added.');
					});
				}
				resetForm();
				$scope.createEmployeeForm.$setPristine();
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();
