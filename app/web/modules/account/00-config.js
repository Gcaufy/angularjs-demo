angular.module('webapp.account', [])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app.account', {
		url : 'account/{cid}',
		templateUrl : 'web/modules/account/member_myacc_01.html',
		controller: 'InfoCtrl'
	});
    $stateProvider.state('app.transaction', {
        url : 'transaction/{cid}',
        templateUrl : 'web/modules/account/member_myacc_02.html',
        controller: 'TransactionCtrl'
    });
    $stateProvider.state('app.acconut.reset', {
        url : '/reset/{cid}',
        templateUrl : 'web/modules/account/member_myacc_03.html',
        controller: 'ResetCtrl'
    });
    $stateProvider.state('app.acconut.security', {
        url : '/security/{cid}',
        templateUrl : 'web/modules/account/member_myacc_04.html',
        controller: 'SecurityCtrl'
    });
})
.factory("ACCOUNT_URL",function(urlHelper){	
	return urlHelper({
		'GET_ACCOUNT_INFO' : 'membership/getAccountInfo/:cid',
		'GET_TRANSACTION_RECORDS' : ' membership/transaction/getTransactionList/',
		'GET_VIRTUAL_ACCONUT' : 'paymentacc/:cid',
		'GET_BALANCE':'membership/transaction/:cid',
		'TOP_UP' : 'membership/transaction/topupByCard',
		'CHANGE_PWD' : 'staffs/changepsw'
	});
})
.directive("passwordVerify", function() {
   return {
	      require: "ngModel",
	      scope: {
	        passwordVerify: '='
	      },
	      link: function(scope, element, attrs, ctrl) {
	        scope.$watch(function() {
	            var combined;

	            if (scope.passwordVerify || ctrl.$viewValue) {
	               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
	            }                    
	            return combined;
	        }, function(value) {
	            if (value) {
	                ctrl.$parsers.unshift(function(viewValue) {
	                    var origin = scope.passwordVerify;
	                    if (origin !== viewValue) {
	                        ctrl.$setValidity("passwordVerify", false);
	                        return undefined;
	                    } else {
	                        ctrl.$setValidity("passwordVerify", true);
	                        return viewValue;
	                    }
	                });
	            }
	        });
	     }
   };
});

