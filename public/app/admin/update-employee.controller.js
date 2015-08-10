(function () {
	'use strict';
	angular.module('app').controller('edUpdateEmployeeCtrl', edUpdateEmployeeCtrl);

	edUpdateEmployeeCtrl.$inject = ['$rootScope', 'edNotifierService', 'edEmployeeService'];

	function edUpdateEmployeeCtrl($rootScope, edNotifierService, edEmployeeService) {
		var vm = this;
		vm.updateEmployee = updateEmployee;
		vm.selectedEmployee = null;
		vm.genderOptions = [
			{
				value: 'male',
				text: 'Male'
			},
			{
				value: 'female',
				text: 'Female'
			}
		];

		activate();

		function activate() {
			var selectedEmployees = edEmployeeService.setSelectMultipleEmployees(false);
			if (selectedEmployees.length === 1) {
				populateEmployee(selectedEmployees);
			}
		}

		function populateEmployee(selectedEmployees) {
			vm.selectedEmployee = {
				name: {
					firstName: selectedEmployees[0].name.firstName,
					lastName: selectedEmployees[0].name.lastName
				},
				image: selectedEmployees[0].image,
				gender: selectedEmployees[0].gender,
				title: selectedEmployees[0].title,
				department: selectedEmployees[0].department,
				team: selectedEmployees[0].team,
				deskLoc: {
					floor: selectedEmployees[0].deskLoc.floor,
					pos: selectedEmployees[0].deskLoc.pos
				}
			};
		}

		$rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			if (selectedEmployees.length === 1) {
				populateEmployee(selectedEmployees);
			} else {
				vm.selectedEmployee = null;
			}
		});

		function updateEmployee(deleteEmployee) {
			var newEmployeeData = {
				name: {
					firstName: vm.selectedEmployee.name.firstName,
					lastName: vm.selectedEmployee.name.lastName
				},
				image: vm.selectedEmployee.image,
				gender: vm.selectedEmployee.gender,
				title: vm.selectedEmployee.title,
				department: vm.selectedEmployee.department,
				team: vm.selectedEmployee.team,
				deskLoc: {
					floor: vm.selectedEmployee.deskLoc.floor,
					pos: vm.selectedEmployee.deskLoc.pos
				}
			};

			if (deleteEmployee) {
				newEmployeeData.deleted = true;
			}

			edEmployeeService.updateEmployee(newEmployeeData).then(function () {
				if (deleteEmployee) {
					edNotifierService.notify('Employee deleted!');
				} else {
					edNotifierService.notify('Employee information updated!');
				}
				vm.selectedEmployee = null;
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();