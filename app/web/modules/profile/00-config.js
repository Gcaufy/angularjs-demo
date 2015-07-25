angular.module('webapp.profile', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.member_profile_01', {
		url : 'member_profile_01',
		templateUrl : 'web/modules/profile/member_profile_01.html',
		controller: 'IndexCtrl'
	});

});
