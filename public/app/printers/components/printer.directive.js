(function () {
	'use strict';
	angular.module('app').directive('edPrinter', edPrinter);

	edPrinter.$inject = ['$stateParams', '$document', '$timeout', 'edPrinterService'];

	function edPrinter($stateParams, $document, $timeout, edPrinterService) {
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

			if ($stateParams.name === attrs.name && scope.mappedPrinter) {
				$timeout(function () {
					$document.scrollToElement(el, 300, 300).then(function () {
						el.addClass('mapped').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>' +
							'<div class="mapped-label label bg-danger">' + scope.mappedPrinter.name + '</div></div>');
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
							el.addClass('mapped').append('<div class="marker"><div class="pulse"></div><div class="pin"></div>' +
								'<div class="mapped-label label bg-danger">' + mappedPrinter.name + '</div></div>');
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

	ctrlFunc.$inject = ['edPrinterService', 'edNotifierService', 'edEmployeeService', 'edRoomService'];

	function ctrlFunc(edPrinterService, edNotifierService, edEmployeeService, edRoomService) {
		var vm = this;
		vm.mapPrinter = mapPrinter;
		vm.printers = edPrinterService.getAllPrinters();
		vm.mappedPrinter = null;

		function mapPrinter(name) {
			var mappedPrinterArray = vm.printers.filter(function (printer) {
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
})();