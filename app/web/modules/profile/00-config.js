angular.module('webapp.profile', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.member_profile_01', {
		url : 'member_profile_01',
		templateUrl : 'web/modules/profile/edit.html',
		controller: 'IndexCtrl'
	});
    $stateProvider.state('app.member_profile_02', {
        url : 'member_profile_02',
        templateUrl : 'web/modules/profile/view.html',
        controller: 'IndexCtrl'
    });

});
