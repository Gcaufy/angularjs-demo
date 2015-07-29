angular.module('webapp.event', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.member_event_01', {
		url : 'member_event_01',
		templateUrl : 'web/modules/event/list.html',
		controller: 'IndexCtrl'
	});
  $stateProvider.state('app.member_event_02', {
      url : 'member_event_02',
      templateUrl : 'web/modules/event/detail.html',
      controller: 'IndexCtrl'
  });
  $stateProvider.state('app.member_event_03', {
    url : 'member_event_03',
    templateUrl : 'web/modules/event/confirm_detail.html',
    controller: 'IndexCtrl'
  });
  $stateProvider.state('app.member_event_04', {
    url : 'member_event_04',
    templateUrl : 'web/modules/event/success.html',
    controller: 'IndexCtrl'
  });
});
