module.exports = {
	bundle: {
		main: {
			scripts: [
				'./public/app/**/*.js'
			]
		},
		vendor: {
			scripts: [
				'./bower_components/jquery/dist/jquery.min.js',
				'./bower_components/toastr/toastr.min.js',
				'./bower_components/angular/angular.min.js',
				'./bower_components/angular-resource/angular-resource.min.js',
				'./bower_components/angular-ui-router/release/angular-ui-router.min.js',
				'./bower_components/angular-animate/angular-animate.min.js',
				'./bower_components/ng-file-upload/ng-file-upload.min.js',
				'./bower_components/angular-filter/dist/angular-filter.min.js',
				'./bower_components/angular-scroll/angular-scroll.min.js',
				'./bower_components/angular-vertilize/angular-vertilize.js',
				'./bower_components/nanoscroller/bin/javascripts/jquery.nanoscroller.min.js',
				'./bower_components/angularUtils-pagination/dirPagination.js',
				'./bower_components/lodash/lodash.min.js',
				'./bower_components/ng-focus-if/focusIf.min.js',
				'./bower_components/moment/min/moment.min.js',
				'./public/analytics/google-analytics.js'
			]
		}
	}
};