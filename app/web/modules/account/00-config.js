angular.module('webapp.account', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.account', {
		url : 'account',
		templateUrl : 'web/modules/account/index.html',
		controller: 'IndexCtrl'
	});
});
