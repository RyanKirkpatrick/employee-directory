(function () {
  'use strict';
  angular.module('app').factory('edDeskService', edDeskService);

  edDeskService.$inject = ['edDeskResourceService'];

  function edDeskService(edDeskResourceService) {
    var service = {
      getAllDesks: getAllDesks,
    };
    return service;

    function getAllDesks() {
      return edDeskResourceService.query();
    }
  }
})();
