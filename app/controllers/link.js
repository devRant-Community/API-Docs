app.controller('LinkController', function ($scope, $http) {
	$scope.links = {};

	$http.get('content/links/links.json').then(function (response) {
		$scope.links = response.data;

		// Sort libraries by language
		$scope.links.libraries.sort(function (a, b) {
			if (a.language < b.language) {
				return -1;
			}
			if (a.language > b.language) {
				return 1;
			}
			return 0;
		});
	});
});