'use strict';

//angular.js main app initialization
var app = angular.module('JaiJaiCakes', []).
    config(['$routeProvider', function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'index.html',
          activetab: '',
          controller: HomeCtrl
        })
        .when('/about', {
          templateUrl: 'pages/about.html',
          activetab: 'about',
          controller: AboutCtrl
        })
        .when('/services', {
          templateUrl: 'pages/services.html',
          activetab: 'services',
          controller: ServicesCtrl
        })
        .when('/works', {
          templateUrl: 'pages/works.html',
          activetab: 'works',
          controller: WorksCtrl
        })
        .when('/contact', {
          templateUrl: 'pages/contact.html',
          activetab: 'contact',
          controller: ContactCtrl
        })
        .otherwise({
          redirectTo: '/'
        });
    }]).run(['$rootScope', '$http', '$browser', '$timeout', "$route", function ($scope, $http, $browser, $timeout, $route) {
      $scope.$on("$routeChangeSuccess", function(scope, next, current) {
        $scope.part = $route.current.activetab;
      });

      //onclick event handlers
      $scope.showForm = function(){
        $('.contactRow').slideToggle();
      };
      $scope.closeForm = function(){
        $('.contactRow').slideUp();
      };

      //save the 'Contact Us' Form
      $scope.save = function(){
        $scope.loaded = true;
        $scope.process = true;
        $http.post('sendemail.php', $scope.message).success(function(){
          $scope.success = true;
          $scope.process = false;
        });
      };
    }]);

app.config(['$locationProvider', function($location){
  $location.hashPrefix('!');
}]);
