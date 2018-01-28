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


app.controller('QAController-View', function ($scope, $routeParams, $location) {
	var questionID = parseInt($routeParams.id);

	if(!Number.isInteger(questionID)) {
		$location.path('/qa');
	}

	$scope.postAnswer = function() {

	};
});


app.controller('QAController-New', function ($scope, $http) {
	$scope.categories = [];
	$scope.question = {};

	$scope.postQuestion = function() {
		var newQuestion = angular.copy($scope.question);

		// Validate
		if(newQuestion.title === '' || newQuestion.title === undefined) {
			return;
		}

		if(newQuestion.body === '' || newQuestion.body === undefined) {
			return;
		}

		if(newQuestion.category === '' || newQuestion.category === undefined) {
			newQuestion.category = 'other';
		}

		// Format
		newQuestion.category = newQuestion.category.toLowerCase();

		// Post to API
		/* ... */
	};

	$http.get('content/qa/categories.json').then(function(response) {
		$scope.categories = response.data;
	});
});