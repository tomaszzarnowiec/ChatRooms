(function() {
    'use strict';

    angular
        .module('login')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'AuthService', 'HelpersService', 'CurrentAuth', '$location'];

    /* @ngInject */
    function LoginController($scope, AuthService, HelpersService, CurrentAuth, $location) {
        var loginCtrl = this;

        if(!HelpersService.isUndefinedOrNull(CurrentAuth))
            $location.path('/chat');

        $scope.login = function(){

            AuthService.auth().$signInWithEmailAndPassword($scope.email, $scope.password)
                .then(function(firebaseUser) {
                        $location.path('/chat');
                    });

        }
    }
})();
