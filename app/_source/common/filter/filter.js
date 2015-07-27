webapp.filter('accountRightsFilter', function() {
	return function(input) {
		var result = input;
		if (input === 'true') {
			result = 'yes';
		} else if (input === 'false') {
			result = 'no';
		}
		return result;
	};
});

