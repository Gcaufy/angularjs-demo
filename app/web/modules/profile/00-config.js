angular.module('webapp.profile', [])
.config(function($stateProvider, $urlRouterProvider) {
 
	$stateProvider.state('app.member_profile_01', {
		url : 'member_profile_01',
		templateUrl : 'web/modules/profile/edit.html',
		controller: 'IndexCtrl'
	});
    $stateProvider.state('app.member_profile', {
        url : 'member_profile',
        templateUrl : 'web/modules/profile/view.html',
        controller: 'ViewCtrl'
    });

})
.factory('MEMBER_PROFILE', function(urlHelper) {
	return urlHelper({
		SHOW_MEMBER : 'enrollment/import/:customerId',
		GET_PORTRAITPHOTO : ['common/getCustomerFile?filePath=', '']
	}); 
});