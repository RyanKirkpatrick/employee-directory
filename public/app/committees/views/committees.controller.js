(function () {
	'use strict';
	angular.module('app').controller('edCommitteesCtrl', edCommitteesCtrl);

	edCommitteesCtrl.$inject = ['$state', 'edSidebarService', 'edEmployeeService', '_'];

	function edCommitteesCtrl($state, edSidebarService, edEmployeeService, _) {
		var vm = this;
		vm.committee = null;
		vm.committeeMembers = [];
		vm.profileEmployee = profileEmployee;

		activate();

		function activate() {
			edSidebarService.setLockSidebar(true);
			// Get the committee based on the current state
			var currentState = $state.current.name;
			vm.committee = {
				name: currentState.split('.')[1]
			};

			if (vm.committee.name) {
				vm.committee.text = vm.committee.name;

				if (vm.committee.name === 'fun-games') {
					vm.committee.text = 'Fun & Games';
				}

				if (vm.committee.name === 'diversity') {
					vm.committee.text = 'Cultural Diversity & Community Outreach';
				}

				edEmployeeService.getAllEmployees().$promise.then(filterEmployeesByCommittee);
			}
		}

		function filterEmployeesByCommittee(employees) {
			vm.committeeMembers = _.sortBy(_.filter(employees, function (employee) {
				if (employee.committees && _.indexOf(employee.committees, vm.committee.name) > -1) {
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