(function () {
  'use strict';
  angular.module('app').factory('edEmployeeResourceService', edEmployeeResourceService);

  edEmployeeResourceService.$inject = ['$resource'];

  function edEmployeeResourceService($resource) {
    var employeeResource = $resource('/api/employees/:id', {
      _id: '@id'
    }, {
      update: {method: 'PUT', isArray: false}
    });

    return employeeResource;
  }
})();
