angular.module('webapp.account', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.account', {
		url : 'account',
		templateUrl : 'web/modules/account/info.html',
		controller: 'InfoCtrl'
	});
});
