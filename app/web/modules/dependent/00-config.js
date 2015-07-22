angular.module('webapp.dependent', [])
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('app.dependent', {
		url : 'dependent',
		templateUrl : 'web/modules/dependent/index.html',
		controller: 'IndexCtrl'
	});
});
