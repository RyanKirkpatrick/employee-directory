(function () {
  'use strict';
  angular.module('app').factory('edEmployeeService', edEmployeeService);

  edEmployeeService.$inject = ['$rootScope'];

  function edEmployeeService($rootScope) {
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
      return [
        {
          name: {
            firstName: 'First1',
            lastName: 'Last1'
          },
          deskLoc: {
            floor: 6,
            pod: 1,
            pos: '1-1'
          }
        },
        {
          name: {
            firstName: 'First2',
            lastName: 'Last2'
          },
          deskLoc: {
            floor: 6,
            pod: 1,
            pos: '1-2'
          }
        },
        {
          name: {
            firstName: 'First3',
            lastName: 'Last3'
          },
          deskLoc: {
            floor: 6,
            pod: 1,
            pos: '1-3'
          }
        },
        {
          name: {
            firstName: 'First4',
            lastName: 'Last4'
          },
          deskLoc: {
            floor: 6,
            pod: 3,
            pos: '3-1'
          }
        }
      ];
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