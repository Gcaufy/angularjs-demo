'use strict';

window.webapp = angular.module(
		"webapp",
		['ui.router']);

webapp.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.when('/c?id', '/contacts/:id').otherwise('login');
		} ]);


webapp.config(['$provide', function($provide) {
    $provide.decorator('$locale', ['$delegate', function($delegate) {
        if ($delegate.id === 'en-us') {
            $delegate.NUMBER_FORMATS.PATTERNS[1].negPre = '-\u00A4';
            $delegate.NUMBER_FORMATS.PATTERNS[1].negSuf = '';
        }
        return $delegate;
    }]);
}]);


window.exports = {};
window.isLocal = window.location.href.indexOf('file:') > -1;
window.urlHelper = function (data) {
	var k, v, rst = {};
	for (k in data) {
		if (typeof(data[k]) === 'string')
			v = data[k];
		else if (data[k].length === 1)
			v = data[k][0];
		else
			v = window.isLocal ? data[k][1] : data[k][0];
		rst[k] = v;
	}
	return rst;  
};
webapp.controller('appRootController', function($scope){
	$scope.$on('to-parent', function(event,data) {
	    $scope.$broadcast('user-changed',data);   
  	});
});

webapp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('htmlCacheClear');
}); 
webapp.factory('htmlCacheClear', function ($q, $window) {
    return {
        request: function (config) {
        	if (config.method === 'GET' && config.url.substr(-5) === '.html') {
        		config.url += '?t=' + window.BUILD_HTML_HASH;
        	}
        	return config;
        }
    };
});
 

$(window).on('popstate', function (e) {
	$('body').children('div').not('[ui-view]').remove();
});

String.prototype.format = function(args) {
    var result = this, reg, key, i;
    if (arguments.length > 0) {    
        if (arguments.length === 1 && typeof (args) === "object") {
            for (key in args) {
                if(args[key] !== undefined){
                    reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (i = 0; i < arguments.length; i++) {
                if (arguments[i] !== undefined) {
                	reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};