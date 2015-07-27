'use strict';

angular.module('AddAuthTokenService',['angular-storage'])
.service('AuthTokenService', function(store) {
    var service = this,
        currentToken = null,
    	currentUserNo = null,
        currentUserName = null,
        currentCustomerId = null,
        id = null,
    	currentCookie = null,
    	currentKaptcha = null,
        fullName = null,
    	currentUserType = null;

    service.setCurrentToken = function(token) {
    	currentToken = token;
        store.set('token', token);
        return currentToken;
    };

    service.getCurrentToken = function() {
        if (!currentToken) {
        	currentToken = store.get('token');
        }
        return currentToken || "No-Token";
    };
    //USERID
    service.setId = function(id) {
        id = id;
        store.set('__id', id);
        return id;
    };

    service.getId = function() {
        if (!id) {
            id = store.get('__id');
        }
        return id ;
    };

    service.setCustomerId = function(id) {
        currentCustomerId = id;
        store.set('__customer', currentCustomerId);
        return currentCustomerId;
    };

    service.getCustomerId = function() {
        if (!currentCustomerId) {
            currentCustomerId = store.get('__customer');
        }
        return currentCustomerId ;
    };


    // FULL NAME
    service.setFullName = function(v) {
        fullName = v;
        store.set('__fullname', v);
        return fullName;
    };

    service.getFullName = function() {
        if (!fullName) {
            fullName = store.get('__fullname');
        }
        return fullName ;
    };

    //USERNO 
    service.setCurrentUserNo = function(userNo) {
        currentUserNo = userNo;
        store.set('userNo', userNo);
        return currentUserNo;
    };

    service.getCurrentUserNo = function() {
        if (!currentUserNo) {
            currentUserNo = store.get('userNo');
        }
        return currentUserNo ;
    };
    
    //USERNAME
    service.setCurrentUserName = function(userName) {
        currentUserName = userName;
        store.set('userName', userName);
        return currentUserName;
    };

    service.getCurrentUserName = function() {
        if (!currentUserName) {
            currentUserName = store.get('userName');
        }
        return currentUserName ;
    };
    
    //userType currentUserType
    service.setCurrentUserType = function(userType) {
    	currentUserType = userType;
        store.set('userType', userType);
        return currentUserType;
    };

    service.getCurrentUserType = function() {
        if (!currentUserType) {
        	currentUserType = store.get('userType');
        }
        return currentUserType ;
    };
    //kaptcha currentKaptcha
    service.setCurrentKaptcha = function(kaptcha) {
    	currentKaptcha = kaptcha;
        store.set('kaptcha', kaptcha);
        return currentKaptcha;
    };

    service.getCurrentKaptcha = function() {
        if (!currentKaptcha) {
        	currentKaptcha = store.get('kaptcha');
        }
        return currentKaptcha ;
    };
    
    //Cookie currentCookie
    service.setCurrentCookie = function(cookie) {
    	currentCookie = cookie;
        store.set('cookie', cookie);
        return currentCookie;
    };

    service.getCurrentCookie = function() {
        if (!currentCookie) {
        	currentCookie = store.get('cookie');
        }
        return currentCookie ;
    };
});