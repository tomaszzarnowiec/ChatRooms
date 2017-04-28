(function() {
    'use strict';

    angular
        .module('register')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', '$location', 'AuthService'];

    /* @ngInject */
    function RegisterController($scope, $location, AuthService) {
        var registerCtrl = this;

        $scope.register = function(){
            AuthService.auth().$createUserWithEmailAndPassword($scope.email, $scope.password)
                .then(function(firebaseUser) {
                    $location.path('/chat');
                });
        }
    }
})();
