angular.module('webapp.user', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.login', {
		url : 'login',
		templateUrl : 'web/modules/user/login.html',
		controller: 'LoginCtrl'
	});
});
