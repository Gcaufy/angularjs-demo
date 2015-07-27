angular.module('webapp.login')
.controller('LoginCtrl', function($scope,$resource,$state,AuthTokenService,LOGIN_URLS,noTokenInterceptor) {
	$scope.login = function() {
		var resource = $resource(LOGIN_URLS.LOGIN);
		resource.save($scope.user,function(data,headers){
			if(data.data){
				var auth_token = headers().token;
				var userName = data.data.userName;
				var userType = data.data.userType;
				var userNo = data.data.userNo;
				var userId = data.data.userId;
				var fullName = data.data.fullName;
				if(!auth_token){
					return;
				}
				if(!userName){
					alertify.error("Login Failed, there is not user name value");
					return;
				}
				if(!userType){
					alertify.error("Login Failed, there is not user type value");
					return;
				}
				if(!userNo){
					alertify.error("Login Failed, there is not userNo value");
					return;
				}
				var customerInfoResource = $resource(LOGIN_URLS.CUSTOMER_ID);
				customerInfoResource.get({
					"userId":userId
				},function(res){
					AuthTokenService.setCustomerId(res.data.customerId);
				});
				AuthTokenService.setCurrentToken(auth_token);
				AuthTokenService.setCurrentUserName(userName);
				AuthTokenService.setCurrentUserType(userType);
				AuthTokenService.setCurrentUserNo(userNo);
				AuthTokenService.setFullName(fullName);
				AuthTokenService.setCurrentUserNo(userNo);
				AuthTokenService.setId(userId);
				$state.go('app.account');
			}
		});

	};
});
