angular.module('webapp.training', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('app.training', {
    url : 'training',
    templateUrl : 'web/modules/training/index.html',
    controller: 'IndexCtrl'
  });

	$stateProvider.state('app.02training', {
		url : '02training',
		templateUrl : 'web/modules/training/list.html',
		controller: 'IndexCtrl'
	});
  $stateProvider.state('app.03training', {
      url : '03training',
      templateUrl : 'web/modules/training/detail.html',
      controller: 'IndexCtrl'
  });
  $stateProvider.state('app.04training', {
    url : '04training',
    templateUrl : 'web/modules/training/confirm_detail.html',
    controller: 'IndexCtrl'
  });
  $stateProvider.state('app.05training', {
    url : '05training',
    templateUrl : 'web/modules/training/confirm_detail2.html',
    controller: 'IndexCtrl'
  });
  $stateProvider.state('app.06training', {
    url : '06training',
    templateUrl : 'web/modules/training/success.html',
    controller: 'IndexCtrl'
  });
  $stateProvider.state('app.07training_manual', {
    url : '07training_manual',
    templateUrl : 'web/modules/training/confirm_manually.html',
    controller: 'IndexCtrl'
  });
  $stateProvider.state('app.08training_manual', {
    url : '08training_manual',
    templateUrl : 'web/modules/training/success.html',
    controller: 'IndexCtrl'
  });
});
