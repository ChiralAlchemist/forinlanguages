var forinlanguagesApp = angular.module('forinlanguages', [
  'file-model',
  'LocalForageModule',
  'forinlanguages.services',
  'forinlanguages.peer',
  'ngRoute',
  'ui.router'
]);

forinlanguagesApp.config(function($routeProvider){
    $routeProvider
    .when('/', {
        templateUrl: 'views/landingPage.html',
        controller : 'PeerController'
    })
    .when('/app', {
        templateUrl:'views/app.html',
        controller : 'PeerController'
    });
});

// forinlanguagesApp.config(function($stateProvider, $urlRouterProvider){
//   $urlRouterProvider.otherwise("")
// })

