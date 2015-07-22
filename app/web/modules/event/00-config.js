angular.module('webapp.event', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.event', {
		url : 'event',
		templateUrl : 'web/modules/event/index.html',
		controller: 'IndexCtrl'
	});
});
