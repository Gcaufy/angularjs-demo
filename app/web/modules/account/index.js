angular.module('webapp.account')

.factory("ACCOUNT_URLS", function(urlHelper) {
	return urlHelper({
		'TRANSACTION_LIST': '/membership/transaction/getTransactionList'
	});
})
.controller('IndexCtrl', function($scope, $resource, ACCOUNT_URLS) {
	var _init = function(){
		var transactionResource = $resource(ACCOUNT_URLS.TRANSACTION_LIST, null);
		transactionResource.get({
			pageNumber: $scope.currentPage || 1,
			pageSize: $scope.pageSize || 10,
			sortBy: $scope.sortBy || 'transactionTimestamp',
			isAscending: false,
			customerID:1,
			clientType:'APP'
		},function(data){
			console.log(data);
		});
	};

	// _init();
});
