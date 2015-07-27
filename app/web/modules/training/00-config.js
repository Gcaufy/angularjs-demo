angular.module('webapp.training', [])
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('app.training', {
    url : 'training',
    templateUrl : 'web/modules/training/index.html',
    controller: 'IndexCtrl'
  });

	$stateProvider.state('app.02training', {
		url : '02training',
		templateUrl : 'web/modules/training/course/list.html',
		controller: 'IndexCtrl'
	});
  $stateProvider.state('app.03training', {
      url : '03training',
      templateUrl : 'web/modules/training/course/detail.html',
      controller: 'IndexCtrl'
  });
  $stateProvider.state('app.04training', {
    url : '04training',
    templateUrl : 'web/modules/training/course/confirm_detail.html',
    controller: 'IndexCtrl'
  });
  $stateProvider.state('app.05training', {
    url : '05training',
    templateUrl : 'web/modules/training/course/confirm_detail2.html',
    controller: 'IndexCtrl'
  });
  $stateProvider.state('app.06training', {
    url : '06training',
    templateUrl : 'web/modules/training/course/success.html',
    controller: 'IndexCtrl'
  });
  $stateProvider.state('app.07training_manual', {
    url : '07training_manual',
    templateUrl : 'web/modules/training/course/confirm_manually.html',
    controller: 'IndexCtrl'
  });
  $stateProvider.state('app.08training_manual', {
    url : '08training_manual',
    templateUrl : 'web/modules/training/course/success.html',
    controller: 'IndexCtrl'
  });

  // for private coach
    $stateProvider.state('app.01private_coaching', {
        url : '01private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.02private_coaching', {
        url : '02private_coaching',
        templateUrl : 'web/modules/training/private_coaching/02private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.03private_coaching', {
        url : '03private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.04private_coaching', {
        url : '04private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.05private_coaching', {
        url : '05private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.06private_coaching', {
        url : '06private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.07private_coaching', {
        url : '07private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.08private_coaching', {
        url : '08private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.09private_coaching', {
        url : '09private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.10private_coaching', {
        url : '10private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.11private_coaching', {
        url : '11private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.12private_coaching', {
        url : '12private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.13private_coaching', {
        url : '13private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
    $stateProvider.state('app.14private_coaching', {
        url : '14private_coaching',
        templateUrl : 'web/modules/training/private_coaching/01private_coaching.html',
        controller: 'IndexCtrl'
    });
});
