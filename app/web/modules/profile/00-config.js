angular.module('webapp.profile', ['SYSCODE'])
.config(function($stateProvider, $urlRouterProvider) {
 
	$stateProvider.state('app.member_profile_edit', {
		url : 'member_profile_edit/{cid}',
		templateUrl : 'web/modules/profile/edit.html',
		controller: 'EditCtrl'
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
		GET_PORTRAITPHOTO : ['common/getCustomerFile?filePath=', ''],
		UPDATE_MEMBER : 'membership/edit',
		UPLOAD_PORTRAITPHOTO : ['enrollment/saveProfile', '']
	}); 
});