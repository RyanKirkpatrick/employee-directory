(function () {
	'use strict';
	angular.module('app', ['ngResource', 'ui.router', 'ngFileUpload', 'angular.filter', 'ngAnimate', 'duScroll', 'angular.vertilize', 'angularUtils.directives.dirPagination', 'focus-if', 'ui.calendar', 'moment-picker']);

	angular.module('app').constant('_', window._).constant('moment', window.moment);
})();