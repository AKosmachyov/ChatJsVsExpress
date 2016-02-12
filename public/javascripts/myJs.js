(function () {

    var app = angular.module('Message', []);
    
    app.controller('getmessageAllUser', function ($scope) {
        $scope.isAuthorize = $chat.isAuthorize;
        var socket;
        if (!socket) {
            socket = io.connect('http://localhost:3000');
            socket.on('chat message', function (data) {
                $chat.sentMessage(data.user, data.message);
                $scope.$apply();
            });
        };
         $scope.keypress = function($event) {
             if($event.keyCode==13 && !$event.shiftKey){
                $scope.addMessage($event.target.value);
                $event.preventDefault();
                $event.target.value='';        
            };
         };
        this.chat = $chat.getAllMessage();
        $scope.addMessage = function (value) {
            var newValue = value.replace(/\s+/g, '');
            if ($chat.isAuthorize() && newValue.length >= 1) {
                socket.emit('chat message', {
                    user: $chat.getNameUser(),
                    message: value
                });
                $chat.sentMessage($chat.getNameUser(), value);
            }
        };
    });

    app.controller('loginCtrl', function ($scope){
        $scope.login = function (l, p, m) {
            $chat.login(l, p, m, up);
        };
        $scope.register = function (n, l, p, m) {
            $chat.register(n, l, p, m, up);
        };
        function up() {
            $scope.$apply();
        };

        $scope.isAuthorize = $chat.isAuthorize;
        $scope.getNameUser = $chat.getNameUser;

        $scope.logOut = $chat.logOut;
        $scope.clearMessageHistory = $chat.clearMessageHistory;
        });
})();
