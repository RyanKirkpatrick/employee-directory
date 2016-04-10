(function () {
	'use strict';
	angular.module('app').controller('edBirthdaysCtrl', edBirthdaysCtrl);

	edBirthdaysCtrl.$inject = ['$state', '$stateParams', 'edSidebarService', 'edEmployeeService', '_', 'moment'];

	function edBirthdaysCtrl($state, $stateParams, edSidebarService, edEmployeeService, _, moment) {
		var vm = this;
		vm.month = null;
		vm.birthMonthEmployees = [];
		vm.profileEmployee = profileEmployee;
		vm.months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
		vm.requestedMonth = $stateParams.month;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
			edEmployeeService.getAllEmployees().$promise.then(filterEmployeesByBirthday);
		}

		function filterEmployeesByBirthday(employees) {
			var currentDay = moment().date();
			vm.birthMonthEmployees = _.sortBy(_.filter(employees, function (employee) {
				// If the employee has a birthday and it is in the month we are looking at, display them
				if (employee.birthdate && vm.requestedMonth === vm.months[moment(employee.birthdate).month()]) {
					// Get the day of the month to display
					employee.birthday = moment(employee.birthdate).date();
					// If the employee's birthday is today, set a property to use
					if (vm.requestedMonth === vm.months[vm.currentMonth] && currentDay === employee.birthday) {
						employee.birthdayToday = true;
					}
					return employee;
				}
			}), 'birthday');
		}

		function profileEmployee(employee) {
			edEmployeeService.removeAllSelectedEmployees();
			$state.go('employees.profile.employee', {'employee': employee.eid});
		}
	}
})();