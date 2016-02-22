angular.module('forinlanguages', [
  'file-model',
  'LocalForageModule',
  'forinlanguages.services',
  'forinlanguages.peer',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/app");

    $stateProvider
    .state('app', {
        url: "/app",
        views: {
            "ConnectionView": {templateUrl:"../views/connection.html"},
            "ChatView" : {templateUrl:"../views/chat.html"}, 
        }
    })
})

// .config(function($routeProvider,$httpProvider){
//     $routeProvider
//     .when('/', {
//         templateUrl: 'index.html',
//         controller : 'PeerController'
//     })
// })
// Main app stuff here


