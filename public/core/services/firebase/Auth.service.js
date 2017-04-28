(function() {
    'use strict';

    angular
        .module('chatRoomsApp')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$firebaseAuth'];

    /* @ngInject */
    function AuthService($firebaseAuth) {
        this.auth = function(){
            return $firebaseAuth();
        }

        this.currentUser = function(){
            return $firebaseAuth().$getAuth();
        }
    }
})();
