(function () {
    var _store = [];
    var _dataUser;
    var _currentUser;
    var onlineUsers = [];

    function _message(to, message, date) {
        return {
            from: to,
            to: to,
            message: message,
            date: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
        }
    }
    function serverOnlineUsers(){
        ajax('/room/onlineUsers', 'POST', null)
            .then(function (val) {
                onlineUsers = JSON.parse(val)
            })
        // var xhr = new XMLHttpRequest();
        // xhr.open("POST", '/onlineUsers', true);
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // xhr.onreadystatechange = function () {
        //     if (xhr.readyState == 4) {
        //         if (xhr.status == 200) {
        //             var answer = JSON.parse(xhr.responseText);
        //             onlineUsers=answer;
        //         }
        //     }
        // };
        // xhr.send();
    }
    function ajax(url, type, data) {
        return $.ajax({
            url:url,
            method: type,
            data: data
        })
    }
    
    this.getDataUser = function () {
        return _dataUser;
    };
    function saveDataUser() {
        localStorage.setItem('dataUser', JSON.stringify(_dataUser));
    }

    // function restoreDataUser() {
    //     _dataUser = JSON.parse(localStorage.getItem('dataUser')) || {};
    // }

    this.clearDataUser = function () {
        _dataUser = null;
        localStorage.setItem('dataUser', null);
    };
    this.sentMessage = function (name, message, date) {
        _store.push(_message(name, message, date));
    };
    this.getAllMessage = function () {
        return _store;
    };
    this.getAllUsersOnline = function () {
        return onlineUsers;
    };
    this.login = function (email, password, update) {
        if (!!email && !!password) {
            ajax('/profile/login','POST',{email:email,password:password})
                .then(function (user) {
                    _currentUser = {
                        userName: user.userName,
                        avatarLink: user.avatarLink
                    };
                    _dataUser = {
                        email: login,
                        password: password
                    };
                    update('logInModul');
                });
        }
    };
    this.register = function (userName, email, password, update) {
        if (!!userName && !!email && !!password) {
            ajax('/profile/register','POST',{userName:userName,email:email,password:password})
                .then(function () {
                    _currentUser = {
                        userName: userName
                    };
                    update('registerModul');
                })        
        }
    };
    this.clearMessageHistory = function () {
        _store.splice(0, _store.length);
        localStorage.setItem('messageHistory', null);
    };
    this.deleteMessage = function (obj, up) {
        var i;
        for (i = 0; i < _store.length; i++) {
            if ((_store[i].from == obj.from) && (_store[i].message == obj.message) && (_store[i].date == obj.date)) {
                _store.splice(i, 1);
                up();
                break;
            }
        }
    };
    this.logOut = function (up) {
        var xhr = new XMLHttpRequest();
        var body = 'id=' + encodeURIComponent(_currentUser.id);
        xhr.open("POST", '/logout', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                _currentUser = null;
                clearDataUser();
                up();
            }
        };
        xhr.send(body);
    };

    this.isAuthorize = function () {
        return !!_currentUser;
    };

    this.getUserName = function () {
        return _currentUser && _currentUser.userName;
    };
    this.getIdUser=function(){
        return _currentUser && _currentUser.id || 0 ;
    };
    this.addOnlineUser = function (user) {
        onlineUsers[user.key]={
            name:user.user.name,
            link:user.user.link
        };
    };


    this.deleteOnlineUser = function (id) {
        delete onlineUsers[id];
    };
    this.countOnlineUsers=function(){
        return onlineUsers.length;
    };

    //restoreDataUser();
    serverOnlineUsers();
    window.$chat = this;
    window.onbeforeunload = function () {
        var xhr = new XMLHttpRequest();
        var body = 'id=' + encodeURIComponent(_currentUser.id);
        xhr.open("POST", '/logout', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                saveDataUser();
            }
        };
        xhr.send(body);
    };

})();