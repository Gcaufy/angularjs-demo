angular.module('webapp.daypass', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.daypass', {
		url : 'daypass',
		templateUrl : 'web/modules/daypass/index.html',
		controller: 'IndexCtrl'
	});
});
