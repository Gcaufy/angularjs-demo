angular.module('webapp.account', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.account', {
		url : 'daypass',
		templateUrl : 'web/modules/account/info.html',
		controller: 'IndexCtrl'
	});
});
