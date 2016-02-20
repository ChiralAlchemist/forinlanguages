var forinlanguagesApp = angular.module('forinlanguages', [
  'file-model',
  'LocalForageModule',
  'forinlanguages.services',
  'forinlanguages.peer',
  'ngRoute',
  'ui.router'
]);

// forinlanguagesApp.config(function($routeProvider){
//     $routeProvider
//     .when('/', {
//         templateUrl: 'views/landingPage.html',
//         controller : 'PeerController'
//     })
//     .when('/app', {
//         templateUrl:'views/app.html',
//         controller : 'PeerController'
//     });
// });

forinlanguagesApp.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/app");

  $stateProvider
  .state("landing" , {
    url: "/",
    templateUrl: "views/landingPage.html" ,
    controller: function($scope){
        $scope.x = 0;
        $scope.user = "joe";
    }
  })
  .state("landing.test",{
    url:"/landing/test",
    templateUrl: "views/test.html",
    controller: function($scope){
        $scope.things = [1,23,44335,6364,'done'];
    }
  })
  .state("app" , {
    url: "/app",
    templateUrl: "views/app.html",
    controller: "PeerController"
  })
  .state("landing.test.user",{
    url: "/lsnding/test/user",
    templateUrl:"views/user.test.html",
  });
})

