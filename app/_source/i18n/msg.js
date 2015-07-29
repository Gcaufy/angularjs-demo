(function () {
	var MSG = {} || window.MSG;

	// Common part
	MSG.COMMON = {
		ERR_BUSY: 'System busy, please retry later.'
	};

	// Module User 
	MSG.MOD_USER = {
		LOGIN: {
			ERR_USERNAME_EMPTY: 'User name cannot be empty',
			ERR_USERNAME_FORMAT: 'User name format is wrong',
			ERR_PASSWORD_EMPTY: 'User password cannot be empty',
			ERR_RES_NO_USERNAME: 'Login Failed, there is not user name value',
			ERR_RES_NO_USERTYPE: 'Login Failed, there is not user type value',
			ERR_RES_NO_USERNO: 'Login Failed, there is not userNo value'
		}
	};

	// export
	window.MSG = MSG;
})();