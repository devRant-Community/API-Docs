// limitTo filter extended with a replace text
app.filter('limitToReplace', function ($filter) {
	return function (input, limit, replace, begin) {
		if (input.length > limit) {
			return $filter('limitTo')(input, limit, begin) + replace;
		}
		return input;
	};
});