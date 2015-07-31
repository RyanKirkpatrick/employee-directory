(function () {
	'use strict';
	angular.module('app').controller('edUpdateEmployeeCtrl', edUpdateEmployeeCtrl);

	edUpdateEmployeeCtrl.$inject = ['$rootScope', 'edNotifierService', 'edEmployeeService'];

	function edUpdateEmployeeCtrl($rootScope, edNotifierService, edEmployeeService) {
		var vm = this;
		vm.updateEmployee = updateEmployee;
		vm.selectedEmployee = {};
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
			} else {
				clearForm();
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

		function clearForm() {
			vm.selectedEmployee = {
				name: {
					firstName: '',
					lastName: ''
				},
				image: '',
				gender: '',
				title: '',
				department: '',
				team: '',
				deskLoc: {
					floor: '',
					pos: ''
				}
			};
		}

		$rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			if (selectedEmployees.length === 1) {
				populateEmployee(selectedEmployees);
			} else {
				clearForm();
			}
		});

		function updateEmployee() {
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

			edEmployeeService.updateEmployee(newEmployeeData).then(function () {
				edNotifierService.notify('Employee information updated!');
				clearForm();
			}, function (reason) {
				edNotifierService.error(reason);
			});
		}
	}
})();