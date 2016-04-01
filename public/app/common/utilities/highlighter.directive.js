/**
 * highlighter directive
 * highlights dom element on model change
 */
(function () {
	'use strict';
	angular.module('app').directive('edHighlighter', edHighlighter);

	edHighlighter.$inject = ['$timeout'];

	function edHighlighter($timeout) {
		var directive = {
			restrict: 'A',
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, element, attrs) {
			scope.$watch(attrs.edHighlighter, function (nv, ov) {
				if (nv !== ov) {
					element.addClass('activate');
					$timeout(function () {
						element.removeClass('activate');
					}, attrs.duration);
				}
			});
		}
	}
})();