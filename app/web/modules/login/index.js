angular.module('webapp.login')
.controller('LoginCtrl', function($scope,$resource,$state,AuthTokenService,LOGIN_URLS,noTokenInterceptor) {
	$scope.login = function() {
		var resource = $resource(LOGIN_URLS.LOGIN),
		 	username = $scope.username,
			password = $scope.password,
			user = {
				username:username,
				password:password
			};
		
		if(!username){
			alertify.error(MSG.MOD_USER.LOGIN.ERR_USERNAME_EMPTY);
			return ;
		}
		if(!WPUtils.isEmail(username)){
			alertify.error(MSG.MOD_USER.LOGIN.ERR_USERNAME_FORMAT);
			return ;
		}
		if(!password){
			alertify.error(MSG.MOD_USER.LOGIN.ERR_PASSWORD_EMPTY);
			return ;
		}
		resource.save(user,function(data,headers){
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
					alertify.error(MSG.MOD_USER.LOGIN.ERR_RES_NO_USERNAME);
					return;
				}
				if(!userType){
					alertify.error(MSG.MOD_USER.LOGIN.ERR_RES_NO_USERTYPE);
					return;
				}
				if(!userNo){
					alertify.error(MSG.MOD_USER.LOGIN.ERR_RES_NO_USERNO);
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
