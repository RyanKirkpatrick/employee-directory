(function () {
	'use strict';
	angular.module('app').directive('edNanoscroller', edNanoscroller);

	edNanoscroller.$inject = ['$timeout'];

	function edNanoscroller($timeout) {
		var directive = {
			restrict: 'A',
			template: '',
			replace: false,
			scope: {},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attrs) {
			$timeout(function () {
				angular.element('.nano').nanoScroller({preventPageScrolling: true});
			}, 3000);
		}
	}
})();