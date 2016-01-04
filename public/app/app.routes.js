(function () {
	'use strict';
	angular.module('app').config(configure);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$compileProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $compileProvider) {
		var routeRoleChecks = {
			superAdmin: requireSuperAdmin,
			admin: requireAdmin,
			user: requireAuth
		};

		// Allow some extra protocols
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|im|sip):/);

		$locationProvider.html5Mode(true);

		// for any unmatched url
		$urlRouterProvider.otherwise('/');

		$urlRouterProvider.when('/employees/', '/employees');
		$urlRouterProvider.when('/printers/', '/printers');
		$urlRouterProvider.when('/rooms/', '/rooms');
		$urlRouterProvider.when('/guilds/', '/guilds');

		$stateProvider
			.state('home', {
				url: '/',
				views: {
					'main': {
						templateUrl: '/partials/common/views/index',
						controller: 'edIndexCtrl',
						controllerAs: 'vm'
					},
					'topbar': {
						templateUrl: '/partials/common/components/index-topbar',
						controller: 'edIndexTopbarCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees', {
				url: '/employees',
				views: {
					'main': {
						templateUrl: '/partials/employees/views/employee',
						controller: 'edEmployeeCtrl',
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
			.state('employees.profile', {
				url: '/profile/?firstname&lastname',
				views: {
					'main@': {
						templateUrl: '/partials/employees/views/profile/employee-profile',
						controller: 'edEmployeeProfileCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.profile.department', {
				url: 'department/:department',
				views: {
					'main@': {
						templateUrl: '/partials/employees/views/profile/employee-profile',
						controller: 'edEmployeeProfileCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.profile.title', {
				url: 'title/:title',
				views: {
					'main@': {
						templateUrl: '/partials/employees/views/profile/employee-profile',
						controller: 'edEmployeeProfileCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.profile.team', {
				url: 'team/:team',
				views: {
					'main@': {
						templateUrl: '/partials/employees/views/profile/employee-profile',
						controller: 'edEmployeeProfileCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.profile.employee', {
				url: 'employee/:employee',
				views: {
					'main@': {
						templateUrl: '/partials/employees/views/profile/employee-profile',
						controller: 'edEmployeeProfileCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.org-chart', {
				url: '/org-chart/:employee',
				views: {
					'main@': {
						templateUrl: '/partials/employees/views/org-chart/org-chart',
						controller: 'edOrgChartCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.map', {
				url: '/map/?employee',
				views: {
					'main@': {
						templateUrl: '/partials/employees/views/map/employee-map',
						controller: 'edEmployeeMapCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.map.buf-6', {
				url: 'buf-6/:seat',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.map.buf-7', {
				url: 'buf-7/:seat',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.map.buf-8', {
				url: 'buf-8/:seat',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('employees.map.nyc-6', {
				url: 'nyc-6/:seat',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('printers', {
				url: '/printers',
				views: {
					'main@': {
						templateUrl: '/partials/printers/views/printer',
						controller: 'edPrinterCtrl',
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
			.state('printers.profile', {
				url: '/profile',
				views: {
					'main@': {
						templateUrl: '/partials/printers/views/profile/printer-profile',
						controller: 'edPrinterProfileCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('printers.profile.name', {
				url: '/name/:printer',
				views: {
					'main@': {
						templateUrl: '/partials/printers/views/profile/printer-profile',
						controller: 'edPrinterProfileCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('printers.profile.brand', {
				url: '/brand/:printerbrand',
				views: {
					'main@': {
						templateUrl: '/partials/printers/views/profile/printer-profile',
						controller: 'edPrinterProfileCtrl',
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
			.state('printers.map.buf-6', {
				url: '/buf-6/:name',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('printers.map.buf-7', {
				url: '/buf-7/:name',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('printers.map.buf-8', {
				url: '/buf-8/:name',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('printers.map.nyc-6', {
				url: '/nyc-6/:name',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('rooms', {
				url: '/rooms',
				views: {
					'main@': {
						templateUrl: '/partials/rooms/views/room',
						controller: 'edRoomCtrl',
						controllerAs: 'vm'
					},
					'sidebar@': {
						templateUrl: '/partials/rooms/components/room-selector',
						controller: 'edRoomSelectorCtrl',
						controllerAs: 'vm'
					},
					'topbar@': {
						templateUrl: '/partials/rooms/components/room-topbar',
						controller: 'edRoomTopbarCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('rooms.profile', {
				url: '/profile',
				views: {
					'main@': {
						templateUrl: '/partials/rooms/views/profile/room-profile',
						controller: 'edRoomProfileCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('rooms.profile.name', {
				url: '/name/:room',
				views: {
					'main@': {
						templateUrl: '/partials/rooms/views/profile/room-profile',
						controller: 'edRoomProfileCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('rooms.profile.type', {
				url: '/type/:roomtype',
				views: {
					'main@': {
						templateUrl: '/partials/rooms/views/profile/room-profile',
						controller: 'edRoomProfileCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('rooms.map', {
				url: '/map',
				views: {
					'main@': {
						templateUrl: '/partials/rooms/views/map/room-map',
						controller: 'edRoomMapCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('rooms.map.buf-6', {
				url: '/buf-6/:name',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('rooms.map.buf-7', {
				url: '/buf-7/:name',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('rooms.map.buf-8', {
				url: '/buf-8/:name',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('rooms.map.nyc-6', {
				url: '/nyc-6/:name',
				views: {
					'main@': {
						templateUrl: '/partials/common/views/floor',
						controller: 'edFloorCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('admin', {
				url: '/admin',
				'views': {
					'main@': {
						templateUrl: '/partials/admin/views/login',
						controller: 'edLoginCtrl',
						controllerAs: 'vm'
					},
					'topbar@': {
						templateUrl: '/partials/admin/components/admin-topbar',
						controller: 'edAdminTopbarCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('admin.users', {
				url: '/users',
				views: {
					'main@': {
						templateUrl: '/partials/admin/views/user-list',
						controller: 'edUserListCtrl',
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
					'main@': {
						templateUrl: '/partials/admin/views/create-user',
						controller: 'edCreateUserCtrl',
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
					'main@': {
						templateUrl: '/partials/admin/views/update-user',
						controller: 'edUpdateUserCtrl',
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
					'main@': {
						templateUrl: '/partials/admin/views/create-employee',
						controller: 'edCreateEmployeeCtrl',
						controllerAs: 'vm'
					}
				},
				resolve: {
					auth: routeRoleChecks.admin
				}
			})
			.state('admin.update-employee', {
				url: '/update-employee',
				views: {
					'main@': {
						templateUrl: '/partials/admin/views/update-employee',
						controller: 'edUpdateEmployeeCtrl',
						controllerAs: 'vm'
					},
					'sidebar@': {
						templateUrl: '/partials/employees/components/employee-selector',
						controller: 'edEmployeeSelectorCtrl',
						controllerAs: 'vm'
					},
					resolve: {
						auth: routeRoleChecks.admin
					}
				}
			})
			.state('admin.seat-picker', {
				url: '/seat-picker',
				views: {
					'main@': {
						templateUrl: '/partials/admin/views/seat-picker',
						controller: 'edSeatPickerCtrl',
						controllerAs: 'vm'
					},
					'sidebar@': {
						templateUrl: '/partials/employees/components/employee-selector',
						controller: 'edEmployeeSelectorCtrl',
						controllerAs: 'vm'
					},
					'topbar@': {
						templateUrl: '/partials/admin/components/seat-picker-topbar',
						controller: 'edSeatPickerTopbarCtrl',
						controllerAs: 'vm'
					},
					resolve: {
						auth: routeRoleChecks.admin
					}
				}
			})
			.state('admin.seat-picker.buf-6', {
				url: '/buf-6',
				views: {
					'main@': {
						templateUrl: '/partials/admin/views/seat-picker-floor',
						controller: 'edSeatPickerFloorCtrl',
						controllerAs: 'vm'
					},
					resolve: {
						auth: routeRoleChecks.admin
					}
				}
			})
			.state('admin.seat-picker.buf-7', {
				url: '/buf-7',
				views: {
					'main@': {
						templateUrl: '/partials/admin/views/seat-picker-floor',
						controller: 'edSeatPickerFloorCtrl',
						controllerAs: 'vm'
					},
					resolve: {
						auth: routeRoleChecks.admin
					}
				}
			})
			.state('admin.seat-picker.buf-8', {
				url: '/buf-8',
				views: {
					'main@': {
						templateUrl: '/partials/admin/views/seat-picker-floor',
						controller: 'edSeatPickerFloorCtrl',
						controllerAs: 'vm'
					},
					resolve: {
						auth: routeRoleChecks.admin
					}
				}
			})
			.state('admin.seat-picker.nyc-6', {
				url: '/nyc-6',
				views: {
					'main@': {
						templateUrl: '/partials/admin/views/seat-picker-floor',
						controller: 'edSeatPickerFloorCtrl',
						controllerAs: 'vm'
					},
					resolve: {
						auth: routeRoleChecks.admin
					}
				}
			})
			.state('guilds', {
				url: '/guilds',
				views: {
					'main@': {
						templateUrl: '/partials/guilds/views/guilds',
						controller: 'edGuildsCtrl',
						controllerAs: 'vm'
					},
					'topbar@': {
						templateUrl: '/partials/guilds/components/guilds-topbar',
						controller: 'edGuildsTopbarCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('guilds.front-end', {
				url: '/front-end',
				views: {
					'main@': {
						templateUrl: '/partials/guilds/views/guilds',
						controller: 'edGuildsCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('help', {
				url: '/help',
				views: {
					'main@': {
						templateUrl: '/partials/help/views/help',
						controller: 'edHelpCtrl',
						controllerAs: 'vm'
					},
					'topbar@': {
						templateUrl: '/partials/help/components/help-topbar',
						controller: 'edHelpTopbarCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('help.navigation', {
				url: '/navigation',
				views: {
					'main@': {
						templateUrl: '/partials/help/views/navigation/help-navigation',
						controller: 'edHelpNavigationCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('help.profile', {
				url: '/profile',
				views: {
					'main@': {
						templateUrl: '/partials/help/views/profile/help-profile',
						controller: 'edHelpProfileCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('help.location', {
				url: '/location',
				views: {
					'main@': {
						templateUrl: '/partials/help/views/location/help-location',
						controller: 'edHelpLocationCtrl',
						controllerAs: 'vm'
					}
				}
			})
			.state('help.org-chart', {
				url: '/org-chart',
				views: {
					'main@': {
						templateUrl: '/partials/help/views/org-chart/help-org-chart',
						controller: 'edHelpOrgChartCtrl',
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
