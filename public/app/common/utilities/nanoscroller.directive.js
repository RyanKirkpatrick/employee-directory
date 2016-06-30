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
			// Do this right away so scrollbars don't display in IE and Firefox
			angular.element('.nano').nanoScroller({preventPageScrolling: true});
		}
	}
})();