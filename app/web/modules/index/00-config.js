angular.module('webapp.index', [])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app.member_index', {
        url : 'member_index',
        templateUrl : 'web/modules/index/index.html',
        controller: 'IndexCtrl'
    });
});
