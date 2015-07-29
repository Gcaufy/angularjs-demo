'use strict';

angular.module('SYSCODE',['angular-storage'])
.service('SysCodeService', function(store,urlHelper,$resource) {
	var service = this,
	currentMapping = null,
	SYSCode = urlHelper({
		'BUSINESS_NATURE': 'dropdownlists/businessNature',
		'NATIONALITY':'dropdownlists/nationality',
		'DROPDOWN_EDUCATION': 'dropdownlists/education',
		'DROPDOWN_HKDISTRICT': 'dropdownlists/HKDistrict'
	});

	service.getCodeMapping = function(code) {
		currentMapping = store.get(code);
        if (!currentMapping) {
        	var currentResource = $resource(SYSCode[code], null);
				currentResource.get(null, function(data) {
					if(data && data.data && data.data.list){
						store.set(code, data.data.list);
						return data.data.list;
					}
				});
        	
        }
        return currentMapping;
    };

    service.getCodeDisplay = function (dropdownlist,codeValue) {
    	var codeDisplay = '';
    	if (!dropdownlist) {
    		return "";
    	}
    	 dropdownlist.forEach( function(element, index, array){
    		if (codeValue === element.codeValue) {
    			codeDisplay = element.codeDisplay;
    		}
    	});
    	 return codeDisplay;
    };
});