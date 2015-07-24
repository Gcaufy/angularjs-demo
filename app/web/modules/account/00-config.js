angular.module('webapp.account', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.member_myacc_01', {
		url : 'member_myacc_01',
		templateUrl : 'web/modules/account/member_myacc_01.html',
		controller: 'IndexCtrl'
	});
});
