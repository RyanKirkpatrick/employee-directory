(function () {
	'use strict';
	angular.module('app').directive('edRoom', edRoom);

	function edRoom() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/components/room',
			replace: true,
			scope: {
				name: '@',
				location: '@',
				number: '@',
				classification: '@',
				xpos: '@',
				ypos: '@'
			}
		};

		return directive;
	}
})();