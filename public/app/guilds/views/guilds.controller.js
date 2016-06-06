(function () {
	'use strict';
	angular.module('app').controller('edGuildsCtrl', edGuildsCtrl);

	edGuildsCtrl.$inject = ['$state', 'edSidebarService', 'edEmployeeService', '_'];

	function edGuildsCtrl($state, edSidebarService, edEmployeeService, _) {
		var vm = this;
		vm.guild = null;
		vm.guildMembers = [];
		vm.profileEmployee = profileEmployee;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
			// Get the guild based on the current state
			var currentState = $state.current.name;
			vm.guild = {
				name: currentState.split('.')[1]
			};

			if (vm.guild.name) {
				edEmployeeService.getAllEmployees().$promise.then(filterEmployeesByGuild);
			}
		}

		function filterEmployeesByGuild(employees) {
			vm.guildMembers = _.sortBy(_.filter(employees, function (employee) {
				if (employee.guilds && _.indexOf(employee.guilds, vm.guild.name) > -1) {
					return employee;
				}
			}), 'lastName');
		}

		function profileEmployee(employee) {
			edEmployeeService.removeAllSelectedEmployees();
			$state.go('employees.profile.employee', {'employee': employee.eid});
		}
	}
})();