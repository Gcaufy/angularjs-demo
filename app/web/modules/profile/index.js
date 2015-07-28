angular.module('webapp.profile')
.controller('ViewCtrl', function($rootScope, $scope, $resource, $state, $stateParams, MEMBER_PROFILE) {
	$scope.loadProfile = function(cid) {
		if (cid) {
			$scope.editInfoValid = true;
			$scope.getFileUrl = MEMBER_PROFILE.GET_PORTRAITPHOTO;
			var resource = $resource(MEMBER_PROFILE.SHOW_MEMBER, {
				customerId: cid
			});
			resource.get(function(rst) {
				if (rst.returnCode === '0') {
					var data = rst.data;
					$scope.customer = data || {};
					$scope.customerMember=data.member || {};
					
				}
			});
		}
	};
	$scope.loadProfile(1); 
});