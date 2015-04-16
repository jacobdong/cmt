'use strict';

angular.module('cmt', ['ngAnimate', 'ngResource', 'ui.router', 'ui.bootstrap', 'ui.grid', 'angular-timeline'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'app/login.html',
        controller: 'LoginCtrl'
      })

    .state('cmt', {
        url: '/cmt',
        templateUrl: 'app/main/main.html'
      })
      .state('cmt.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/dashboard.html',
        controller: 'MainCtrl'

      })

    .state('cmt.customerList', {
        url: '/customers',
        templateUrl: 'app/customer/customer-list.html',
        controller: 'MainCtrl'
      })
      .state('cmt.customerAdd', {
        url: '/customers/add',
        templateUrl: 'app/customer/customer-add.html',
        controller: 'CustomerCtrl'
      })
      .state('cmt.customerDetail', {
        url: '/customers/:id',
        templateUrl: 'app/customer/customer.html',
        controller: 'CustomerCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })


.controller('LoginCtrl', ['$scope', '$state', function($scope, $state) {
  var vm = $scope.vm = {};

  vm.userLogin = function() {
    $state.go('cmt.dashboard');
  }
}])

.controller('MainCtrl', ['$scope', function($scope) {

  console.log('enter');
  var vm = $scope.vm = {};

  vm.customers = [];

  for (var i = 1; i < 20; i++) {
    var customer = {
      id: i,
      name: 'orgname_' + i,
      status: 1,
      email: 'jacobdong@msn.com'
    }

    vm.customers.push(customer);
  }

  console.log(vm.customers);
}])

.controller('CustomerCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
  var vm = $scope.vm = {};
  vm.addTimelineNode = function() {
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      size: 'lg',
      backdrop: 'static',
      controller: function($scope, $modalInstance, items) {
        $scope.items = items;
        $scope.selected = {
          //item: $scope.items[0]
        };

        $scope.ok = function() {
          $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function() {
          $modalInstance.dismiss('cancel');
        };
      },
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}]);