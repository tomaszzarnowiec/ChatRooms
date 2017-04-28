(function() {
    'use strict';

    angular
        .module('chat')
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$scope', '$location', '$timeout', 'HelpersService', 'AuthService', 'Fire', 'CurrentAuth'];

    /* @ngInject */
    function ChatController($scope, $location, $timeout, HelpersService, AuthService, Fire, CurrentAuth) {
        var chatCtrl = this;

        $scope.loggedUser = CurrentAuth.email;

        $scope.logout = function(){
            var activeUsersRef = firebase.database().ref('users').child(CurrentAuth.uid).remove();
            AuthService.auth().$signOut();
        }

        var usersRef = firebase.database().ref('users');
        $scope.users = Fire.array(usersRef);

        var messagesRef = firebase.database().ref('messages');
        $scope.messages = Fire.array(messagesRef);

        var typingRef = firebase.database().ref('typing');
        $scope.typing = Fire.array(typingRef);

        messagesRef.on('value', function(snap){
            $timeout(function(){
                var objDiv = $('.chat-panel .panel-body');
                objDiv.scrollTop(objDiv[0].scrollHeight);
            }, 500);
        });

        $scope.sendMessage = function(){

            if(HelpersService.isUndefinedOrNull($scope.messageText) || $scope.messageText == "")
                return;

            var data = {
                text: $scope.messageText,
                date: moment().format(HelpersService.dateFormat.datetimeseconds),
                user: CurrentAuth.uid,
                userEmail: CurrentAuth.email
            }

            $scope.messages.$add(data).then(function(){
                $scope.messageText = "";
            });
        }
    }
})();
