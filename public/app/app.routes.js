(function () {
	'use strict';
	angular.module('app').config(configure);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider) {
		var routeRoleChecks = {
			superAdmin: requireSuperAdmin,
			admin: requireAdmin,
			user: requireAuth
		};

		$locationProvider.html5Mode(true);

		// for any unmatched url
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('main', {
				url: '/',
				views: {
					'main': {
						templateUrl: '/partials/main/main',
						controller: 'edMainCtrl',
						controllerAs: 'vm'
					},
					'sidebar': {
						templateUrl: '/partials/components/employee-selector',
						controller: 'edEmployeeSelectorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('main.seat-map', {
				url: 'seat-map',
				views: {
					'main@': {
						templateUrl: '/partials/seat-map/seat-map',
						controller: 'edSeatMapCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('main.seat-map.floor-6', {
				url: '/floor-6/:pos',
				views: {
					'main@': {
						templateUrl: '/partials/seat-map/seat-map',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('main.seat-map.floor-7', {
				url: '/floor-7/:pos',
				views: {
					'main@': {
						templateUrl: '/partials/seat-map/seat-map',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('main.seat-map.floor-8', {
				url: '/floor-8/:pos',
				views: {
					'main@': {
						templateUrl: '/partials/seat-map/seat-map',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('login', {
				url: '/login',
				views: {
					'main': {
						templateUrl: '/partials/account/login',
						controller: 'edLoginCtrl',
						controllerAs: 'vm'
					},
					'sidebar': {
						template: '<div>hi</div>'
					}
				}
			})
			.state('admin', {
				url: '/admin',
				'views': {
					'main': {
						template: '<div ui-view="main"></div>'
					},
					'sidebar': {
						template: '<div ui-view="sidebar"></div>'
					}
				},
				resolve: {
					auth: routeRoleChecks.admin
				}
			})
			.state('admin.users', {
				url: '/users',
				views: {
					'main': {
						templateUrl: '/partials/admin/user-list',
						controller: 'edUserListCtrl',
						controllerAs: 'vm'
					},
					'sidebar': {
						templateUrl: '/partials/components/admin-menu',
						controller: 'edAdminMenuCtrl',
						controllerAs: 'vm'
					}
				},
				resolve: {
					auth: routeRoleChecks.superAdmin
				}
			})
			.state('admin.create-user', {
				url: '/create-user',
				views: {
					'main': {
						templateUrl: '/partials/admin/create-user',
						controller: 'edCreateUserCtrl',
						controllerAs: 'vm'
					},
					'sidebar': {
						templateUrl: '/partials/components/admin-menu',
						controller: 'edAdminMenuCtrl',
						controllerAs: 'vm'
					}
				},
				resolve: {
					auth: routeRoleChecks.superAdmin
				}
			})
			.state('admin.update-user', {
				url: '/update-user',
				views: {
					'main': {
						templateUrl: '/partials/admin/update-user',
						controller: 'edUpdateUserCtrl',
						controllerAs: 'vm'
					},
					'sidebar': {
						templateUrl: '/partials/components/admin-menu',
						controller: 'edAdminMenuCtrl',
						controllerAs: 'vm'
					}
				},
				resolve: {
					auth: routeRoleChecks.user
				}
			})
			.state('admin.create-employee', {
				url: '/create-employee',
				views: {
					'main': {
						templateUrl: '/partials/admin/create-employee',
						controller: 'edCreateEmployeeCtrl',
						controllerAs: 'vm'
					},
					'sidebar': {
						templateUrl: '/partials/components/admin-menu',
						controller: 'edAdminMenuCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('admin.update-employee', {
				url: '/update-employee',
				views: {
					'main': {
						templateUrl: '/partials/admin/update-employee',
						controller: 'edUpdateEmployeeCtrl',
						controllerAs: 'vm'
					},
					'sidebar': {
						templateUrl: '/partials/components/employee-selector',
						controller: 'edEmployeeSelectorCtrl',
						controllerAs: 'vm'
					}
				}
			});
	}

	requireAdmin.$inject = ['edAuthService'];

	function requireAdmin(edAuthService) {
		return edAuthService.authorizeCurrentUserForRoute('admin');
	}

	requireSuperAdmin.$inject = ['edAuthService'];

	function requireSuperAdmin(edAuthService) {
		return edAuthService.authorizeCurrentUserForRoute('super-admin');
	}

	requireAuth.$inject = ['edAuthService'];

	function requireAuth(edAuthService) {
		return edAuthService.authorizeAuthenticatedUserForRoute();
	}
})();
