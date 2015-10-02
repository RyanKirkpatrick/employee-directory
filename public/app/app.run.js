(function () {
	'use strict';
	angular.module('app').run(appRun);

	appRun.$inject = ['$rootScope', '$state', '$stateParams', '$document'];

	function appRun($rootScope, $state, $stateParams, $document) {
		$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
			if (error === 'not authorized') {
				$state.go('login');
			}
		});

		$rootScope.$on('$stateChangeSuccess', function() {
			$document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
			$stateParams.firstname = null;
			$stateParams.lastname = null;
		});
	}
})();
