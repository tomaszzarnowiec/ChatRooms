(function() {
    'use strict';

    angular
        .module('main')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$location', 'AuthService', 'Fire'];

    /* @ngInject */
    function MainController($scope, $location, AuthService, Fire) {
        var mainCtrl = this;

        AuthService.auth().$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {
                if($location.path() == '/register'){
                    $location.path('/chat');
                }

                var activeUsersRef = firebase.database().ref('users').child(firebaseUser.uid);
                var userObj = Fire.object(activeUsersRef);
                userObj.email = firebaseUser.email;
                userObj.isActive = true;

                userObj.$save();

                $scope.isAuth = true;
            } else {
                $scope.isAuth = false;

                $location.path('/login');
            }
        });


    }
})();
