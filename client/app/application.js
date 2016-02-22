angular.module('forinlanguages', [
  'file-model',
  'LocalForageModule',
  'forinlanguages.services',
  'forinlanguages.peer',
 'forinlanguages.chat',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise("/app");

    $stateProvider
    .state('app', {
        url: "/app",
        views: {
            "ConnectionView": {templateUrl:"../views/connection.html",
                             controller: "PeerController"},
            "ChatView" : {templateUrl:"../views/chat.html",
                        controller:"ChatController"}, 
        },
    });
});

// .config(function($routeProvider,$httpProvider){
//     $routeProvider
//     .when('/', {
//         templateUrl: 'index.html',
//         controller : 'PeerController'
//     })
// })
// Main app stuff here


