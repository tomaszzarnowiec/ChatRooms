(function() {
    'use strict';

    angular
        .module('chatRoomsApp')
        .service('DbService', DbService);

    DbService.$inject = ['HelpersService', '$rootScope', '$firebaseArray'];

    /* @ngInject */
    function DbService(HelpersService, $rootScope, $firebaseArray) {
        var srv = this;

        this.db = function() {
            return firebase.database().ref();
        }

        this.userDb = function(uid){
            var db = srv.db().child('userDb').child(uid);
            return db;
        }

        this.sharedDb = function(table){
            var db = srv.db().child('shared').child(table);
            return db;
        }

        this.orderBy = function(ref, by, method, data){
            data = data ? data : null;

            switch (method) {
                case 'equal':
                    return ref.orderByChild(by).equalTo(data);
                    break;
                case 'between':
                    return ref.orderByChild(by).startAt(data.start).endAt(data.end)
                    break;
                case 'greather-than':
                    return ref.orderByChild(by).startAt(data.start)
                    break;
                case 'less-than':
                    return ref.orderByChild(by).endAt(data.end)
                    break;
                default:
                    return ref;
            }
        }
    }
})();
