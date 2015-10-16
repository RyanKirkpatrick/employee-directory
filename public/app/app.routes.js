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
			.state('employees', {
				url: '/?firstname&lastname',
				views: {
					'main': {
						templateUrl: '/partials/employees/views/profile/employee-profile',
						controller: 'edEmployeeProfileCtrl',
						controllerAs: 'vm'
					},
					'sidebar': {
						templateUrl: '/partials/employees/components/employee-selector',
						controller: 'edEmployeeSelectorCtrl',
						controllerAs: 'vm'
					},
					'topbar': {
						templateUrl: '/partials/employees/components/employee-topbar',
						controller: 'edEmployeeTopbarCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.map', {
				url: 'map',
				views: {
					'main@': {
						templateUrl: '/partials/employees/views/map/employee-map',
						controller: 'edEmployeeMapCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.map.floor-6', {
				url: '/floor-6/:seat',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.map.floor-7', {
				url: '/floor-7/:seat',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.map.floor-8', {
				url: '/floor-8/:seat',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('printers', {
				url: '/printers?printer',
				views: {
					'main@': {
						templateUrl: '/partials/printers/views/profile/printer-profile',
						controller: 'edPrinterProfileCtrl',
						controllerAs: 'vm'
					},
					'sidebar@': {
						templateUrl: '/partials/printers/components/printer-selector',
						controller: 'edPrinterSelectorCtrl',
						controllerAs: 'vm'
					},
					'topbar@': {
						templateUrl: '/partials/printers/components/printer-topbar',
						controller: 'edPrinterTopbarCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('printers.map', {
				url: '/map',
				views: {
					'main@': {
						templateUrl: '/partials/printers/views/map/printer-map',
						controller: 'edPrinterMapCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('printers.map.floor-6', {
				url: '/floor-6/:name',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('printers.map.floor-7', {
				url: '/floor-7/:name',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('printers.map.floor-8', {
				url: '/floor-8/:name',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
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
						template: '<div></div>'
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
						templateUrl: '/partials/employees/components/employee-selector',
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
