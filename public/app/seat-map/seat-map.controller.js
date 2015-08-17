(function () {
	'use strict';
	angular.module('app').controller('edSeatMapCtrl', edSeatMapCtrl);

	edSeatMapCtrl.$inject = ['$state', '$rootScope', '$scope', 'edEmployeeService'];

	function edSeatMapCtrl($state, $rootScope, $scope, edEmployeeService) {
		var vm = this;
		vm.selectedEmployees = edEmployeeService.setSelectMultipleEmployees(false);

		var deregister = $rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
			if (selectedEmployees.length === 1) {
				$state.go('seat-map.floor-' + selectedEmployees[0].deskLoc.floor, {'pos': selectedEmployees[0].deskLoc.pos});
			}
		});

		$scope.$on('$destroy', deregister);
	}
})();
