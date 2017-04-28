(function() {
    'use strict';

    angular
        .module('chatRoomsApp')
        .service('DataService', DataService);

    DataService.$inject = ['$window', 'AuthService', 'DbService', 'Fire', 'HelpersService'];

    /* @ngInject */
    function DataService($window, AuthService, DbService, Fire, HelpersService) {

        var srv = this;

        this.getSavings = function() {
            srv.refreshDate();
            return AuthService.auth().$requireSignIn().then(function(user){
                var userSavingsRef = DbService.userDb(user.uid).child('savings');
                var filteredSavings = DbService.orderBy(userSavingsRef, 'date', 'equal', srv.currentMonth);
                return Fire.array(filteredSavings).$loaded();
            });
        }

    }
})();
