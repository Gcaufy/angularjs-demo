(function () {
	var _WPUtils = window.WPUtils || {};

	_WPUtils.isEmail = function(value) {
		var EMAIL_REGEXP = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
		return EMAIL_REGEXP.test(value);
	};
	window.WPUtils = _WPUtils;

})();