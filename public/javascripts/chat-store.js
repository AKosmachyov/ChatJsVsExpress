(function(){
    var _store=[];
    var _currentUser;
    function _message(to,message){
        return {
            from:to,
            to:to,
            message:message,
            data:new Date()
            }
    };
    //function saveState(){
    //    localStorage.setItem('messageHistory',JSON.stringify(_store));
    //};
    //function restoreState(){
    //  _store=JSON.parse(localStorage.getItem('messageHistory'))||[];
    //};
    
    this.sentMessage=function(name,message){
        
         _store.push(_message(name,message));
         console.log(_store);
        
    };
    this.getAllMessage=function(){
        
       var xhr = new XMLHttpRequest();
           
            xhr.open("POST", '/test', true)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.onreadystatechange =function() { 
                if (xhr.readyState == 4) { 
                        if(xhr.status == 200) {
                            _currentUser={name:xhr.responseText};
                     
                            }  
                }
            };

            xhr.send();  
              
        
        return _store;
    };
    this.login=function(login,password,nameModul,update){
        if(login && password){
            var xhr = new XMLHttpRequest();
            var body = 'login=' + encodeURIComponent(login) +  '&password=' + encodeURIComponent(password);
            xhr.open("POST", '/login', true)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.onreadystatechange =function() { 
                if (xhr.readyState == 4) { 
                        if(xhr.status == 200) {
                            _currentUser={name:xhr.responseText};
                            update();
                            $('#'+nameModul).modal('hide');
                            }
                        if(xhr.status==302){
                            alert("Невернеы данные");
                        };
                        if(xhr.status===203){
                            alert("Данный email не зарегистрирован");
                        };
                        
                }
            };

            xhr.send(body);  
            };
    };
    this.register=function(name,login,password,nameModul,update){
          if(name && login && password ){  
              var xhr = new XMLHttpRequest();
             var body = 'name=' + encodeURIComponent(name) + '&login=' + encodeURIComponent(login)+ '&password=' + encodeURIComponent(password);
              xhr.open("POST", '/register', true)
              xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
              xhr.onreadystatechange =function() { 
                if (xhr.readyState == 4) { 
                    if(xhr.status == 200) {
                       _currentUser={name:xhr.responseText};
                       update();
                       $('#'+nameModul).modal('hide');
                    };
                    if(xhr.status==302){
                        alert("Данный email зарегистрирован")
                    };
                }
            };

            xhr.send(body);  
            }; 
    };      
    this.clearMessageHistory=function(){
        _store.splice(0,_store.length);
        localStorage.setItem('messageHistory',null)  ;
    };
    this.logOut=function(){
         _currentUser=null;
    };
    
    this.isAuthorize=function(){
        return !!_currentUser;
    };
    
    this.getNameUser=function(){
        return _currentUser.name;
    };
    
    //restoreState();
    window.$chat=this;
    window.onbeforeunload = function () {
       // saveState();
    };
    
})();