(function () {
	'use strict';
	angular.module('app').run(appRun);

	appRun.$inject = ['$rootScope', '$state', '$document'];

	function appRun($rootScope, $state, $document) {
		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			if (error === 'not authorized') {
				$state.go('login');
			}
		});

		$rootScope.$on('$stateChangeSuccess', function() {
			$document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
		});
	}
})();
