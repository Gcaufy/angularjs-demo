angular.module('webapp.login', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.login1', {
		url : 'login1',
		templateUrl : 'web/modules/login/index.html',
		controller: 'LoginCtrl'
	});
    $stateProvider.state('app.login2', {
        url : 'login2',
        templateUrl : 'web/modules/login/index2.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.login3', {
        url : 'login3',
        templateUrl : 'web/modules/login/index3.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.login4', {
        url : 'login4',
        templateUrl : 'web/modules/login/index4.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.login5', {
        url : 'login5',
        templateUrl : 'web/modules/login/index5.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.login6', {
        url : 'login6',
        templateUrl : 'web/modules/login/index6.html',
        controller: 'IndexCtrl'
    });
})
.factory("LOGIN_URLS", function(urlHelper) {
    return urlHelper({
        "LOGIN": "home/login",
        "CUSTOMER_ID":'membership/getCustomerName/:userId'
    });
});
