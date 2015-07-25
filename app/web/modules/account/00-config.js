angular.module('webapp.account', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.account', {
		url : 'account',
		templateUrl : 'web/modules/account/index.html',
		controller: 'IndexCtrl'
	});
	$stateProvider.state('app.member_myacc_01', {
		url : 'member_myacc_01',
		templateUrl : 'web/modules/account/member_myacc_01.html',
		controller: 'IndexCtrl'
	});
    $stateProvider.state('app.member_myacc_02', {
        url : 'member_myacc_02',
        templateUrl : 'web/modules/account/member_myacc_02.html',
        controller: 'IndexCtrl'
    });
});
