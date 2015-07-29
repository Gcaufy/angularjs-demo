angular.module('webapp.profile')
.controller('EditCtrl', function($rootScope, $http, $scope, $resource, $state, $stateParams, MEMBER_PROFILE, SysCodeService) {
	var cid = $stateParams.cid;
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
	$scope.loadProfile(cid); 

	$scope.update = function(customer) {
		if (customer.customerId) {
			delete customer.createDate;
			delete customer.updateDate;
			delete customer.customerEnrollments;
			delete customer.member;
			for (var i in customer.customerAdditionInfos) {
				customer.customerAdditionInfos[i].captionId = customer.customerAdditionInfos[i].id.captionId;
				delete customer.customerAdditionInfos[i].updateDate;
				delete customer.customerAdditionInfos[i].updateBy;
			}
			customer.customerAddresses[0].addressType = 'BILL';
			var res = $resource(MEMBER_PROFILE.UPDATE_MEMBER,null,{'update': { method: 'PUT' }});
			res.update(customer,function(data) {
				if(data.returnCode === '0'){
					//alertify.success('save customer profile success!');
					$state.go('app.member_profile',{cid: customer.customerId});
					return;
				} else {
					$scope.loadProfile(cid);
					return;
				}
				
			});
		}
	};
	$scope.reset = function() {
        $state.go('app.member_profile',{'cid' : cid});
    };

    //upload the customer's profile
    $scope.uploadPortraitPhoto = function(elem){
    	var len = elem.files.length;
		if (!len) {
			/*alertify.error('please select a photo image');*/
			alert('please select a photo image');
			return;
		}
		var fileName = elem.files[0].name;
		if (checkImgType(fileName.substr(fileName.lastIndexOf('.'),fileName.length))) {
			//upload image file
			var fd = new FormData();
			fd.append('file', elem.files[0]);
	        $http.post(MEMBER_PROFILE.UPLOAD_PORTRAITPHOTO, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(data){
	        	$scope.customer.portraitPhoto = data.data.imagePath;
	        	$scope.checkCustomerProfile = true;
	        })
	        .error(function(){
	        	/*alertify.error('upload fail');*/
	        	alert('upload fail');
	        });
		}
    };

    //check the picture's type,must be image type
    function checkImgType(ths){  
	    if (!ths) {  
	        /*alertify.error('please select a photo image');*/
	        alert('please select a photo image');
	        return false;  
	    } else {  
	        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(ths)) {  
	            /*alertify.error('the file must be a picture'); */
	            alert('the file must be a picture');
	            return false;  
	        }  
	    }  
	    return true;  
	}

});