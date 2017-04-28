(function() {
    'use strict';

    angular
        .module('chatRoomsApp')
        .service('Fire', Fire);

    Fire.$inject = ['$firebaseArray', '$firebaseObject'];

    /* @ngInject */
    function Fire($firebaseArray, $firebaseObject) {
        this.array = function(ref){
            return $firebaseArray(ref);
        }

        this.object = function(ref){
            return $firebaseObject(ref);
        }
    }
})();
