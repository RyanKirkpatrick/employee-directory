(function () {
	'use strict';
	angular.module('app').run(appRun);

	appRun.$inject = ['$rootScope', '$state', '$stateParams', '$document'];

	function appRun($rootScope, $state, $stateParams, $document) {
		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			if (error === 'not authorized') {
				$state.go('admin');
			}
		});

		// Clear state params and scroll to the top on route changes
		$rootScope.$on('$stateChangeSuccess', function () {
			$document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
			$stateParams.firstname = null;
			$stateParams.lastname = null;
			$stateParams.printer = null;
			$stateParams.printerbrand = null;
			$stateParams.room = null;
			$stateParams.roomtype = null;
			$stateParams.employee = null;
			$stateParams.team = null;
			$stateParams.department = null;
		});
	}
})();
