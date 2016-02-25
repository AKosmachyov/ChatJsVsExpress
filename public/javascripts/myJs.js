(function () {

    var app = angular.module('Message', ["pageslide-directive"]);
    app.controller('getmessageAllUser', function ($scope) {
        var block = window.document.getElementsByClassName("messageViewArea")[0]||{};

        $scope.getNameUser = $chat.getNameUser;
        $scope.isAuthorize = $chat.isAuthorize;
        var socket;
        var messageFull;
        if (!socket) {
            socket = io.connect(window.location.origin);
            socket.on('chat message', function (data) {
                var date=new Date(data.date);
                $chat.sentMessage(data.user, data.message,date);
                $scope.$apply();
            });
            socket.on('deleteMessage',function(messageObj){
                $chat.deleteMessage(messageObj,up);
            });
            socket.on('sendOnlineUser',function(user){
                $chat.addOnlineUser(user);
                $scope.$apply();
            });
            socket.on('deleteOnlineUser',function(id){
               $chat.deleteOnlineUser(id);
                $scope.$apply();
            });
        }
        $scope.keypress = function($event) {
             if($event.keyCode==13 && !$event.shiftKey){
                $scope.addMessage($event.target.value);
                $event.preventDefault();
                $event.target.value='';        
             }
        };
        this.onlineUser=$chat.getAllUsersOnline();
        this.chat = $chat.getAllMessage();
        $scope.addMessage = function (value) {
            if(value.length>0) {
                var newValue = value.replace(/\s+/g, '');
                if ($chat.isAuthorize() && newValue.length >= 1) {
                    messageFull = {
                        user: $chat.getNameUser(),
                        message: value,
                        date: new Date()
                    };
                    socket.emit('chat message', messageFull);
                    $chat.sentMessage(messageFull.user, messageFull.message, messageFull.date);
                }
            }
            block.scrollTop = block.scrollHeight;
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

        $scope.logOut =function() {
            $chat.logOut(up);
        };
        $scope.clearMessageHistory = $chat.clearMessageHistory;
        (function getUserLocalStorage(){
            var savedUser = $chat.getDataUser();
            if (savedUser) {
                $chat.login(savedUser.login, savedUser.password,up);
            }
        })();

    });
    app.controller('pageslideCtrl',['$scope',function($scope){

        $scope.checked = false; // This will be binded using the ps-open attribute

        $scope.toggle = function(){
            $scope.checked = !$scope.checked
        };
        $scope.numberOfOnlineUsers=$chat.numberOfOnlineUsers;

    }]);
})();
