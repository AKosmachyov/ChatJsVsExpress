(function () {

    var app = angular.module('Message', []);
    app.controller('getmessageAllUser', function ($scope) {
        $scope.getNameUser = $chat.getNameUser;
        $scope.isAuthorize = $chat.isAuthorize;
        var socket;
        var messageFull;
        if (!socket) {
            socket = io.connect('http://localhost:3000');
            socket.on('chat message', function (data) {
                var date=new Date(data.date);
                $chat.sentMessage(data.user, data.message,date);
                $scope.$apply();
            });
            socket.on('deleteMessage',function(messageObj){
                $chat.deleteMessage(messageObj,up);
            })
        }
        $scope.keypress = function($event) {
             if($event.keyCode==13 && !$event.shiftKey){
                $scope.addMessage($event.target.value);
                $event.preventDefault();
                $event.target.value='';        
             }
        };
        this.chat = $chat.getAllMessage();
        $scope.addMessage = function (value) {
            var newValue = value.replace(/\s+/g, '');
            if ($chat.isAuthorize() && newValue.length >= 1){
                 messageFull={
                     user:$chat.getNameUser(),
                     message: value,
                     date:new Date()
                };
                socket.emit('chat message',messageFull);
                $chat.sentMessage(messageFull.user, messageFull.message,messageFull.date);
            }
        };
        $scope.deleteMessage= function (messageObj) {
            socket.emit('deleteMessage',messageObj);
            $chat.deleteMessage(messageObj);
        };
        function up() {
            $scope.$apply();
        }
    });

    app.controller('loginCtrl', function ($scope){
        var temp=true;
        $scope.login = function (l, p) {
            $chat.login(l, p, up);
        };
        $scope.register = function (n, l, p) {
            $chat.register(n, l, p, up);
        };
        function up(nameModule) {
            $('#'+nameModule).modal('hide');
            $scope.$apply();
        }
        $scope.isAuthorize = $chat.isAuthorize;
        $scope.getNameUser = $chat.getNameUser;

        $scope.logOut = $chat.logOut;
        $scope.clearMessageHistory = $chat.clearMessageHistory;
        $scope.getUserLocalStorage=function(){
            if ($chat.getDataUser().length > 0&&temp) {
                $chat.login($chat.getDataUser()[0], $chat.getDataUser()[1],up);
                temp=false;
            }
        };

    });
})();
