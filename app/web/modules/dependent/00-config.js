angular.module('webapp.dependent', [])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app.member_dependent_01', {
        url : 'member_dependent_01',
        templateUrl : 'web/modules/dependent/list.html',
        controller: 'IndexCtrl'
    });
	$stateProvider.state('app.member_dependent_02', {
		url : 'member_dependent_02',
		templateUrl : 'web/modules/dependent/detail.html',
		controller: 'IndexCtrl'
	});
});
