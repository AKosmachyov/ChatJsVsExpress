(function () {

    var app = angular.module('Message', []);
    
    app.controller('getmessageAllUser', function ($scope) {
      
        this.socket;
        if (!this.socket) {
            this.socket = io.connect('http://localhost:3000');
            this.socket.on('chat message', function (data) {
                $chat.sentMessage(data.user, data.message);
                $scope.$apply();
            });
        }

        this.chat = $chat.getAllMessage();
        this.addMessage = function (value) {
            var newValue = value.replace(/\s+/g, '');
            if ($chat.isAuthorize() && newValue.length >= 1) {


                this.socket.emit('chat message', {
                    user: $chat.getNameUser(),
                    message: value
                });
                $chat.sentMessage($chat.getNameUser(), value);


            }
        }
        this.keypress = function($event,newMessage) {
        if($event.keyCode==13){
            this.addMessage(newMessage);
            
            };
        if($event.keyCode==13 && $event.shiftKey){
                
            };
          
          
        
        };
    });

    app.controller('loginCtrl', function ($scope) {
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
