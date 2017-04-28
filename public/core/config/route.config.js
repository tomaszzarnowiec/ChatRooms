(function() {
    'use strict';

    angular
        .module('chatRoomsApp').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

            $routeProvider
            .when(
                '/chat',{
                    templateUrl: 'app/chat/chat.view.html',
                    controller: 'ChatController',
                    resolve: {
                        CurrentAuth: ["$firebaseAuth", function($firebaseAuth) {
                            return $firebaseAuth().$requireSignIn();
                        }]
                    }
                }
            )
            .when(
                '/register',{
                    templateUrl: 'app/register/register.view.html',
                    controller: 'RegisterController',
                    resolve: {
                        "CurrentAuth": ["$firebaseAuth", function($firebaseAuth) {
                            return $firebaseAuth().$waitForSignIn();
                        }]
                    }
                }
            )
            .when(
                '/login',{
                    templateUrl: 'app/login/login.view.html',
                    controller: 'LoginController',
                    resolve: {
                        "CurrentAuth": ["$firebaseAuth", function($firebaseAuth) {
                            return $firebaseAuth().$waitForSignIn();
                        }]
                    }
                }
            )
            .otherwise({
                redirectTo: '/chat'
            });

            $locationProvider.hashPrefix('');
        }])
        .run(["$rootScope", '$window', "$location", function($rootScope, $window, $location) {

            $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
                // console.log('error', error);
                if (error === "AUTH_REQUIRED") {
                    $location.path("/login");
                }
            });

        }]);
})();
