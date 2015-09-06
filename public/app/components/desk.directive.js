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
					$document.scrollToElement(el, 700, 300).then(function () {
						el.addClass('active').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>');
					});
				}, 300);
			} else {
				el.removeClass('active').find('.marker').remove();
			}

			var deregister = $rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
				if (selectedEmployees.length === 1 && selectedEmployees[0].deskLoc && selectedEmployees[0].deskLoc.seat === attrs.seat) {
					$timeout(function () {
						$document.scrollToElement(el, 700, 300).then(function () {
							el.addClass('active').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>');
						});
					}, 300);
				} else {
					el.removeClass('active').find('.marker').remove();
				}
			});

			scope.$on('$destroy', deregister);
		}
	}
})();