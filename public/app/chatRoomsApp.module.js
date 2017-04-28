(function() {
    'use strict';

    angular
        .module('chatRoomsApp', [
            'ngRoute',
            'ngAnimate',
            'firebase',
            'main',
            'login',
            'register',
            'chat'
        ]);
})();
