webapp.config(function($httpProvider) {
	$httpProvider.interceptors.push('addTokenInterceptor');
	$httpProvider.interceptors.push('noTokenInterceptor');
});

webapp.factory('addTokenInterceptor', function(AuthTokenService) {
	return {
		request: function(config, $rootScope) {
			//		      config.headers = {'Content-Type':"application/json;charset=UTF-8"};
			config.headers['token'] = AuthTokenService.getCurrentToken();
			config.headers['sessionId'] = AuthTokenService.getCurrentCookie();
			return config;
		}
	};
});
webapp.factory('noTokenInterceptor', function($window, AuthTokenService, $rootScope, $injector) {
	return {
		response: function(response) {
			if (response.success) {
				// $window.location.href = "#/login";
				var stateService = $injector.get('$state');
				stateService.go('app.login');
				return response;
			}
			if (response.data.returnCode) {
				var kaptchaCodes = response.data.returnCode.split(",");
				for (var i = 0; i < kaptchaCodes.length; i++) {
					if (kaptchaCodes[i] === "9010108" || kaptchaCodes[i] === "9010107") {
						$rootScope.isNeedKaptcha = true;
						AuthTokenService.setCurrentKaptcha(true);
					}
					if (kaptchaCodes[i] !== "9010108" && kaptchaCodes[i] !== "9010107" && kaptchaCodes[i].length === 7) {
						$rootScope.isNeedKaptcha = false;
						AuthTokenService.setCurrentKaptcha(false);
					}
				}
			}
			return response;
		}
	};
});