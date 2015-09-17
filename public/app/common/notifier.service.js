(function () {
	'use strict';
	angular.module('app').value('edToastr', toastr);

	angular.module('app').factory('edNotifierService', edNotifierService);

	edNotifierService.$inject = ['edToastr'];

	function edNotifierService(edToastr) {
		var service = {
			notify: notify,
			info: info,
			error: error
		};

		edToastr.options = {
			'showDuration': '300',
			'hideDuration': '300'
		};

		return service;

		function notify(msg) {
			edToastr.success(msg);
		}

		function info(msg) {
			edToastr.info(msg);
		}

		function error(msg) {
			edToastr.error(msg);
		}
	}
})();
