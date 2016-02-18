(function(){
    var _store=[];
    var _dataUser=[];
    var _currentUser;
    var onlineUser;
    function _message(to,message,date){
        return {
            from:to,
            to:to,
            message:message,
            date:date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        }
    }
    this.getDataUser=function(){
        return _dataUser;
    };
    function saveDataUser(){
        localStorage.setItem('dataUser',JSON.stringify(_dataUser));
    }
    function restoreDataUser(){
     _dataUser=JSON.parse(localStorage.getItem('dataUser'))||[];
    }
    this.clearDataUser=function(){
        _dataUser.splice(0,_dataUser.length);
        localStorage.setItem('dataUser',null)  ;
    };
    this.sentMessage=function(name,message,date){
        _store.push(_message(name,message,date));
    };
    this.getAllMessage=function(){
        return _store;
    };
    this.login=function(login, password, update){
        if(login && password){
            var xhr = new XMLHttpRequest();
            var body = 'login=' + encodeURIComponent(login) +  '&password=' + encodeURIComponent(password);
            xhr.open("POST", '/login', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.onreadystatechange =function() { 
                if (xhr.readyState == 4) { 
                        if(xhr.status == 200) {
                            var answer=JSON.parse(xhr.responseText);
                            _currentUser={name:answer.name};
                            onlineUser=answer.onlineUser;
                            console.log(onlineUser);
                            _dataUser=[login,password];
                            update('logInModul');

                        }
                        if(xhr.status==301){
                            alert("Невернеы данные");
                        }
                        if(xhr.status===204){
                            alert("Данный email не зарегистрирован");
                        }
                        
                }
            };

            xhr.send(body);  
            }
    };
    this.register=function(name, login, password, update){
          if(name && login && password ){  
              var xhr = new XMLHttpRequest();
             var body = 'name=' + encodeURIComponent(name) + '&login=' + encodeURIComponent(login)+ '&password=' + encodeURIComponent(password);
              xhr.open("POST", '/register', true);
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
              xhr.onreadystatechange =function() { 
                if (xhr.readyState == 4) { 
                    if(xhr.status == 200) {

                       _currentUser={name:xhr.responseText};
                       update('registerModul');

                    }
                    if(xhr.status==203){
                        alert("Данный email зарегистрирован")
                    }
                    if(xhr.status==400){
                        alert("Плохой запрос или логин не соответствует требованиям")
                    }
                }
            };

            xhr.send(body);  
            }
    };
    this.clearMessageHistory=function(){
        _store.splice(0,_store.length);
        localStorage.setItem('messageHistory',null)  ;
    };
    this.deleteMessage=function(obj,up){
        var i;
        for(i=0;i<_store.length;i++) {
            if((_store[i].from==obj.from)&&(_store[i].message==obj.message)&&(_store[i].date==obj.date)){
                _store.splice(i,1);
                up();
                break;
            }
        }
    };
    this.logOut=function(up){
        var xhr = new XMLHttpRequest();
        var body='name=' + encodeURIComponent(_currentUser);
        xhr.open("POST", '/logout', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange =function() {
            if (xhr.readyState == 4) {
                _currentUser=null;
                clearDataUser();
                up();
                console.log(onlineUser);
            }
        };
        xhr.send(body);

    };
    
    this.isAuthorize=function(){
        return !!_currentUser;
    };
    
    this.getNameUser=function(){
        return _currentUser && _currentUser.name;
    };
    
    restoreDataUser();
    window.$chat=this;
    window.onbeforeunload = function () {
       saveDataUser();
    };
    
})();