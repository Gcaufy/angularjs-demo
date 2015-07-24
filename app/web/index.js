'use strict';

window.webapp = angular.module('webapp', ['ui.router', 
    'webapp.home',
    'webapp.daypass',
    'webapp.event',
    'webapp.dependent',
    'webapp.login'
]);

webapp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/");
    
    $stateProvider.state('app', {
        url : '/',
        templateUrl : 'web/index.html',
        controller: 'IndexCtrl'
    });
});



window.exports = {};

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


angular.module('webapp.home', ['ngRoute', 'ui.router'])
.controller('IndexCtrl', function($scope) {
	console.log('this is home page');
});
