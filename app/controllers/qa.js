app.controller('QAController-Main', function ($scope, $http, $location) {
	$scope.categories = [];
	$scope.activeCategory = ($location.search().category === undefined) ? 'all' : $location.search().category;
	$scope.search = ($location.search().search === undefined) ? "" : $location.search().search;
	$scope.isSearch = !($location.search().search === undefined);

	$scope.viewQuestion = function(id) {
		$location.path('/qa/' + id);
	};

	$scope.setCategory = function(name) {
		if(name === 'all') {
			$location.search('category', null);
		} else {
			$location.search('category', name.toLowerCase());
		}
	};

	$scope.searchQuestions = function() {
		$location.search('search', $scope.search);
	};

	$scope.deleteSearch = function() {
		$location.search('search', null);
	};

	$http.get('content/qa/categories.json').then(function(response) {
		$scope.categories = response.data;
	});
});


app.controller('QAController-View', function ($scope, $routeParams) {
	// ...
});


app.controller('QAController-New', function ($scope) {
	// ...
});