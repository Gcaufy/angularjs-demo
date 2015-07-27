angular.module('webapp.user')
.factory("USER_URLS", function(urlHelper) {
	return urlHelper({
		LOGIN: 'home/login'
	});
})
.controller('LoginCtrl', function($scope, $resource, USER_URLS,AuthTokenService,noTokenInterceptor) {
	$scope.login = function() {
		var username = $scope.username,
			password = $scope.password,
			kaptcha = $scope.kaptcha;
		
		if(!username){
			alertify.error("User name cannot be empty");
			return ;
		}
		if(!password){
			alertify.error("User password cannot be empty");
			return ;
		}
		if(kaptcha){
			kaptcha = kaptcha.replace(/\s/g, "");
		}
		username = username.replace(/\s/g, "");
		password = password.replace(/\s/g, "");
		var loginUser = {
			"username" : username,
			"password" : password,
			"validCode" : kaptcha
		};
		var resource = $resource(USER_URLS.LOGIN);
		resource.save(loginUser,function(data,headers){
			if(data.data){
				var auth_token = headers().token;
				var userName = data.data.userName;
				var userType = data.data.userType;
				var userNo = data.data.userNo;
				var userId = data.data.userId;
				var fullName = data.data.fullName;
				if(!auth_token){
					//alertify.error("Login Failed, there is not auth_token value");
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
				AuthTokenService.setCurrentToken(auth_token);
				AuthTokenService.setCurrentUserName(userName);
				AuthTokenService.setCurrentUserType(userType);
				AuthTokenService.setCurrentUserNo(userNo);
				AuthTokenService.setFullName(fullName);
				AuthTokenService.setCurrentUserNo(userNo);
				AuthTokenService.setId(userId);
				$state.go('home');
			}else{
				_getKaptcha();
			}
		},function(data,status){
			alertify.error("Login Failed, please check your username and password");
		});
	};
});