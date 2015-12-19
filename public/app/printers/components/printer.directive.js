(function () {
	'use strict';
	angular.module('app').directive('edPrinter', edPrinter);

	edPrinter.$inject = ['$stateParams', '$document', '$timeout', '$compile', 'edPrinterService'];

	function edPrinter($stateParams, $document, $timeout, $compile, edPrinterService) {
		var directive = {
			restrict: 'E',
			templateUrl: '/partials/printers/components/printer',
			replace: true,
			scope: {
				name: '@',
				classification: '@',
				orientation: '@',
				xpos: '@',
				ypos: '@'
			},
			link: linkFunc,
			controller: ctrlFunc,
			controllerAs: 'vm'
		};

		return directive;

		function linkFunc(scope, el, attrs) {
			scope.mappedPrinter = edPrinterService.getMappedPrinter();

			// If coming from the profile page via a link in the printer card
			if ($stateParams.name === attrs.name && scope.mappedPrinter) {
				$timeout(function () {
					$document.scrollToElement(el, 300, 300).then(function () {
						el.addClass('mapped').append($compile('<div class="marker"><div class="pulse"></div><div class="pin"></div>' +
							'<div class="mapped-label label bg-danger" ng-click="vm.viewProfile()">' + scope.mappedPrinter.name + '</div></div>')(scope));
						// Do some math to figure out how to center the label
						var markerLabel = $('.mapped-label');
						var leftPos = (el.outerWidth() / 2) - (markerLabel.outerWidth() / 2);
						markerLabel.css('left', leftPos);
					});
				}, 800);
			} else {
				el.removeClass('mapped').find('.marker').remove();
			}

			var deregister = scope.$on('mappedPrinterChange', function (event, mappedPrinter) {
				if (mappedPrinter && mappedPrinter.name === attrs.name) {
					$timeout(function () {
						$document.scrollToElement(el, 300, 300).then(function () {
							el.addClass('mapped').append($compile('<div class="marker"><div class="pulse"></div><div class="pin"></div>' +
								'<div class="mapped-label label bg-danger" ng-click="vm.viewProfile()">' + mappedPrinter.name + '</div></div>')(scope));
							// Do some math to figure out how to center the label
							var markerLabel = $('.mapped-label');
							var leftPos = (el.outerWidth() / 2) - (markerLabel.outerWidth() / 2);
							markerLabel.css('left', leftPos);
						});
					}, 100);
				} else {
					el.removeClass('mapped').find('.marker').remove();
				}
			});

			scope.$on('$destroy', deregister);
		}
	}

	ctrlFunc.$inject = ['$state', 'edPrinterService', 'edNotifierService', 'edEmployeeService', 'edRoomService', '_'];

	function ctrlFunc($state, edPrinterService, edNotifierService, edEmployeeService, edRoomService, _) {
		var vm = this;
		vm.mapPrinter = mapPrinter;
		vm.viewProfile = viewProfile;
		vm.printers = edPrinterService.getAllPrinters();
		vm.mappedPrinter = null;

		var viewingProfile = false;

		function mapPrinter(name) {
			// Don't map printer if the user wants to view the profile
			if (!viewingProfile) {
				var mappedPrinterArray = _.filter(vm.printers, function (printer) {
					return printer.name === name;
				});

				if (mappedPrinterArray.length > 0) {
					// Only allow 1 thing to be mapped at a time
					edEmployeeService.updateMappedEmployee(null);
					edRoomService.updateMappedRoom(null);
					vm.mappedPrinter = edPrinterService.updateMappedPrinter(mappedPrinterArray[0]);
				} else {
					edNotifierService.error('Sorry, I don\'t know this printer.');
				}
			}
		}

		function viewProfile() {
			viewingProfile = true;
			edPrinterService.removeAllSelectedPrinters();
			edPrinterService.updateSelectedPrinters(edPrinterService.getMappedPrinter());
			$state.go('printers');
		}
	}
})();