(function () {
	'use strict';
	angular.module('app').directive('edArtifact', edArtifact);

	function edArtifact() {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/common/components/artifact',
			replace: true,
			scope: {
				name: '@',
				orientation: '@',
				classification: '@',
				xpos: '@',
				ypos: '@'
			},
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;
	}

	function ctrlFunc() {
		var vm = this;
	}
})();