angular.module('webapp.account')

.controller('InfoCtrl', function($scope, $resource, $state, $stateParams, ACCOUNT_URL, AuthTokenService) {
	
	/* params */
	$scope.cid = AuthTokenService.getCustomerId();	
		
	/* functions */
	$scope.getAccountInfo = function(){
		var resource = $resource(ACCOUNT_URL.GET_ACCOUNT_INFO,{cid:$scope.cid});
		resource.get(function(data){
			if(data.returnCode === '0'){				
				$scope.serviceAcconut = data.data.serviceAccount;
				$scope.servicePlan = data.data.planName;
				$scope.memberType = data.data.memberType;
				$scope.effectiveDate = data.data.effectiveDate;
				$scope.expiryDate = data.data.expiryDate;
				$scope.creditLimit = data.data.limitValue;
				$scope.dayPassDailyQuota = data.data.dailyQuota;
				$scope.facilities = data.data.facilityEntitlements;		
				
				$scope.trains = [];
				$scope.others = [];
				
				for(var i in data.data.servicePlanRightMasterDtos){
					var rightOption = data.data.servicePlanRightMasterDtos[i];
					if(rightOption.rightCode.indexOf('TRAIN') > -1){
						$scope.trains.push(rightOption);
					}else{
						$scope.others.push(rightOption);
					}					
				}			
			}
		});		
	};
	
	$scope.resetPwd = function(){
		$state.go('app.reset');
	};
	
	$scope.setQuestion = function(){
		$state.go('app.security');
	};
	
	$scope.goTransaction = function(){
		$state.go('app.transaction');
	};
	
	/* start */
	(function _init(){
		$scope.getAccountInfo();
	})();

})
.controller('TransactionCtrl', function($scope, $resource, $state, $stateParams, ACCOUNT_URL, AuthTokenService) {
	
	/* params */
	$scope.cid = AuthTokenService.getCustomerId();	
	$scope.page = 1;
	$scope.pageSize = 10;
	$scope.isClickTopup = false;
	$scope.conditionList = [
	                        {
	                        	'text':'Last 10 Times',
	                          	'value':10
	                        },
	                        {
	                        	'text':'Last 20 Times',
	                          	'value':20	                        	
	                        },
	                        {
	                        	'text':'Last 30 Times',
	                          	'value':30	                        	
	                        },
	                        {
	                        	'text':'Last 40 Times',
	                          	'value':40		                        	
	                        }];
	var condition = {
			"customerID" : $scope.cid,
			"clientType" : 'APP',
			"pageNumber" : $scope.page,
			"pageSize" : $scope.pageSize,
			"sortBy" : 'transactionTimestamp',
			"isAscending" : 'false'				
	};
			
	
	/* functions */
	$scope.getBanlance = function(){
		var resource = $resource(ACCOUNT_URL.GET_BALANCE,{cid:$scope.cid});	
		resource.get(function(data){
			if(data.returnCode === '0'){					
				$scope.balance = data.data;
			}
		});		
	};
		
	$scope.getTransactionInfo = function(params){
		var resource = $resource(ACCOUNT_URL.GET_TRANSACTION_RECORDS,{});	
		resource.get(params,function(data){
			if(data.returnCode === '0'){					
				$scope.transactions = data.data.list;
			}
		});		
	};
	
	$scope.getVirtualAccount = function(){
		var resource = $resource(ACCOUNT_URL.GET_VIRTUAL_ACCONUT,{cid:$scope.cid});	
		resource.get(function(data){
			if(data.returnCode === '0'){					
				$scope.virtualAccount = data.data.accNo;
			}
		});
	};
	
	$scope.conditionSearch = function(){		
		$scope.pageSize = $scope.listShow.value;	
		var params = {
				"customerID" : $scope.cid,
				"clientType" : 'APP',
				"pageNumber" : $scope.page,
				"pageSize" : $scope.pageSize,
				"sortBy" : 'transactionTimestamp',
				"isAscending" : 'false'				
		}; 
		$scope.getTransactionInfo(params);		
	};
	
	$scope.clickTopup = function(){
		$scope.isClickTopup = true;
	};
	
	$scope.submitForm = function(){
		var params = {
				"customerId":$scope.cid,
				"topUpAmount":$scope.amount
		};
		var resource = $resource(ACCOUNT_URL.TOP_UP,{});	
		resource.save(params,function(data){
			if(data.returnCode === '0'){					
				$scope.virtualAccount = data.data.accNo;
			}
		});
	};
	
	$scope.goAccountInfo = function(){
		$state.go('app.account');
	};
		
	/* start */
	(function _init(){
		$scope.getBanlance();
		$scope.getVirtualAccount();
		$scope.getTransactionInfo(condition);
	})();
		
})
.controller('ResetCtrl', function($scope, $resource, $state, $stateParams, ACCOUNT_URL, AuthTokenService) {
	
	/* params */
	$scope.cid = AuthTokenService.getCustomerId();	
	
	/* funciotn */
	$scope.submitForm = function(){
		var params = {
				"userId" : $scope.cid,
				"oldPsw" : $scope.oldPwd,
				"newPsw" : $scope.newPwd,
				"repeatPsw" : $scope.newPwd_verify			
		};
		var resource = $resource(ACCOUNT_URL.CHANGE_PWD,{});	
		resource.save(params,function(data){
			if(data.returnCode === '0'){					
				alertify.success('Change Success');
			}
		});		
	};
	
	$scope.goTransaction = function(){
		$state.go('app.transaction');
	};
	
})
.controller('SecurityCtrl', function($scope, $resource, $state, $stateParams, ACCOUNT_URL, AuthTokenService) {
	
	/* params */
	$scope.cid = AuthTokenService.getCustomerId();	
	$scope.userId = AuthTokenService.getId();
	
	/* funciotn */
	$scope.getQuestionList = function(){
		var resource = $resource(ACCOUNT_URL.GET_SECURITY_QUESTION,{});	
		resource.get(function(data){
			if(data.returnCode === '0'){					
				$scope.questionList = data.data.list;
				$scope.Q1 = $scope.questionList[0];
				$scope.Q2 = $scope.questionList[1];
			}
		});	
	};
	
	$scope.submitForm = function(){
		var params = {
				 "userId": $scope.userId, 
				 "answers": [
				        {
				            "questionNo": '1', 
				            "code": $scope.Q1.codeValue, 
				            "answer": $scope.A1
				        }, 
				        {
				            "questionNo": '2', 
				            "code": $scope.Q2.codeValue, 
				            "answer": $scope.A2
				        }
				 ]				
		};
		var resource = $resource(ACCOUNT_URL.SAVE_SECURITY_QUESTION,{});	
		resource.save(params,function(data){
			if(data.returnCode === '0'){					
				alertify.success('Save Success');
			}
		});	
	};
	
	$scope.goTransaction = function(){
		$state.go('app.transaction');
	};
	
	/* start */
	(function _init(){
		$scope.getQuestionList();
	})();
		
});

