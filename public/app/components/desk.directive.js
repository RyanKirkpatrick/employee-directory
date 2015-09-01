(function () {
	'use strict';
	angular.module('app').directive('edDesk', edDesk);

	edDesk.$inject = ['$rootScope', '$stateParams'];

	function edDesk($rootScope, $stateParams) {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/components/desk',
			replace: true,
			scope: {
				floor: '@',
				pos: '@',
				orientation: '@',
				xpos: '@',
				ypos: '@'
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attrs) {
			if ($stateParams.pos === attrs.pos) {
				el.addClass('active').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>');
			}

			var deregister = $rootScope.$on('selectedEmployeeChange', function (event, selectedEmployees) {
				if (selectedEmployees.length === 1 && selectedEmployees[0].deskLoc && selectedEmployees[0].deskLoc.pos === attrs.pos) {
					el.addClass('active').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>');
				} else {
					el.removeClass('active').find('.marker').remove();
				}
			});

			scope.$on('$destroy', deregister);
		}
	}
})();