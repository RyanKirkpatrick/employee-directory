(function () {
	'use strict';
	angular.module('app').run(appRun);

	appRun.$inject = ['$rootScope', '$location'];

	function appRun($rootScope, $location) {
		$rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
			if (rejection === 'not authorized') {
				$location.path('/');
			}
		});
	}
})();
