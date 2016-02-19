var forinlanguagesApp = angular.module('forinlanguages', [
  'file-model',
  'LocalForageModule',
  'forinlanguages.services',
  'forinlanguages.peer',
  'ngRoute'
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
//Main app stuff here


