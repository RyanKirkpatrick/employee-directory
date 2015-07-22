(function () {
  'use strict';
  angular.module('app').factory('edEmployeeService', edEmployeeService);

  edEmployeeService.$inject = ['$rootScope', 'edEmployeeResourceService'];

  function edEmployeeService($rootScope, edEmployeeResourceService) {
    var selectedEmployees = [];
    var selectMultipleEmployees = false;
    var service = {
      selectedEmployees: selectedEmployees,
      selectMultipleEmployees: selectMultipleEmployees,
      getAllEmployees: getAllEmployees,
      getSelectedEmployees: getSelectedEmployees,
      updateSelectedEmployees: updateSelectedEmployees,
      removeAllSelectedEmployees: removeAllSelectedEmployees,
      setSelectMultipleEmployees: setSelectMultipleEmployees,
      getSelectMultipleEmployees: getSelectMultipleEmployees
    };
    return service;

    function getAllEmployees() {
      return edEmployeeResourceService.query();
    }

    function getSelectedEmployees() {
      return selectedEmployees;
    }

    function updateSelectedEmployees(employee) {
      if (selectMultipleEmployees) {
        if (!employee.selected) {
          employee.selected = true;
          selectedEmployees.push(employee);
        } else {
          employee.selected = false;
          selectedEmployees.splice(selectedEmployees.indexOf(employee), 1);
        }
      } else {
        if (!employee.selected) {
          angular.forEach(selectedEmployees, function (prevSelected, value) {
            prevSelected.selected = false;
          });
          employee.selected = true;
          selectedEmployees = [employee];
        } else {
          employee.selected = false;
          selectedEmployees = [];
        }
      }
      $rootScope.$broadcast('selectedEmployeeChange', selectedEmployees);
      return selectedEmployees;
    }

    function removeAllSelectedEmployees() {
      angular.forEach(selectedEmployees, function (prevSelected, value) {
        prevSelected.selected = false;
      });
      $rootScope.$broadcast('selectedEmployeeChange', selectedEmployees);
      selectedEmployees = [];
    }

    function setSelectMultipleEmployees(selectMultiple) {
      selectMultipleEmployees = selectMultiple;
    }

    function getSelectMultipleEmployees() {
      return selectMultipleEmployees;
    }
  }
})();
