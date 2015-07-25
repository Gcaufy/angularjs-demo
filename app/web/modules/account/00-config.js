angular.module('webapp.account', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.account', {
		url : 'account',
		templateUrl : 'web/modules/account/info.html',
		controller: 'InfoCtrl'
	});
    $stateProvider.state('app.member_myacc_02', {
        url : 'member_myacc_02',
        templateUrl : 'web/modules/account/member_myacc_02.html',
        controller: 'IndexCtrl'
    });
});
