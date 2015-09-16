(function () {
	'use strict';
	angular.module('app').directive('edDesk', edDesk);

	edDesk.$inject = ['$rootScope', '$stateParams', '$document', '$timeout'];

	function edDesk($rootScope, $stateParams, $document, $timeout) {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/components/desk',
			replace: true,
			scope: {
				seat: '@',
				orientation: '@',
				classification: '@',
				xpos: '@',
				ypos: '@'
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attrs) {
			if ($stateParams.seat === attrs.seat) {
				$timeout(function () {
					$document.scrollToElement(el, 300, 300).then(function () {
						el.addClass('mapped').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>');
					});
				}, 800);
			} else {
				el.removeClass('mapped').find('.marker').remove();
			}

			var deregister = $rootScope.$on('mappedEmployeeChange', function (event, mappedEmployee) {
				if (mappedEmployee && mappedEmployee.seat === attrs.seat) {
					$timeout(function () {
						$document.scrollToElement(el, 300, 300).then(function () {
							el.addClass('mapped').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>');
						});
					}, 100);
				} else {
					el.removeClass('mapped').find('.marker').remove();
				}
			});

			scope.$on('$destroy', deregister);
		}
	}
})();