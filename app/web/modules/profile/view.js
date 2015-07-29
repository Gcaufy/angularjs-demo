angular.module('webapp.profile')
.controller('ViewCtrl', function($rootScope, $scope, $resource, $state, $stateParams, MEMBER_PROFILE, SysCodeService, AuthTokenService) {
	$scope.nationalityList = SysCodeService.getCodeMapping('NATIONALITY');
	$scope.loadProfile = function(cid) {
		if (cid) {
			$scope.editInfoValid = true;
			$scope.businessNatureCode = SysCodeService.getCodeMapping('BUSINESS_NATURE');
			$scope.getFileUrl = MEMBER_PROFILE.GET_PORTRAITPHOTO;
			var resource = $resource(MEMBER_PROFILE.SHOW_MEMBER, {
				customerId: cid
			});
			resource.get(function(rst) {
				if (rst.returnCode === '0') {
					var data = rst.data;
					$scope.customer = data || {};
					$scope.customerMember=data.member || {};
					if(angular.isArray($scope.nationalityList)){
						$scope.nationalityList.forEach(function(element, index, array){
							if(element.codeValue === $scope.customer.nationality){
								$scope.customer.nationality = element.codeDisplay;
							}
						});
					}
					if(angular.isArray($scope.businessNatureCode)){
						$scope.businessNatureCode.forEach(function(element, index, array){
							if(element.codeValue === $scope.customer.businessNature){
								$scope.customer.businessNature = element.codeDisplay;
							}
						});
					}
					
				}
			});
		}
	};
	$scope.loadProfile(AuthTokenService.getCustomerId()); 

	$scope.checkEditInfoAct = function () {
		$state.go('app.member_profile_edit',{'cid' : AuthTokenService.getCustomerId()});
	};
});