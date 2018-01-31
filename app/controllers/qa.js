app.controller('QAController-Main', function ($scope, $http, $location, $auth) {
	$scope.categories = [];
	$scope.questions = [];
	$scope.activeCategory = ($location.search().category === undefined) ? 'all' : $location.search().category;
	$scope.search = ($location.search().search === undefined) ? '' : $location.search().search;
	$scope.searchCopy = angular.copy($scope.search); // Copy so the ng-model doesn't affect it.
	$scope.isSearch = !($location.search().search === undefined);

	$scope.viewQuestion = function (id) {
		$location.path('/qa/' + id);
	};

	$scope.setCategory = function (name) {
		if (name === 'all') {
			$location.search('category', null);
		} else {
			$location.search('category', name.toLowerCase());
		}
	};

	$scope.searchQuestions = function () {
		if ($scope.search == '') {
			return;
		}

		$location.search('search', $scope.search);
	};

	$scope.deleteSearch = function () {
		$location.search('search', null);
	};

	$scope.newQuestion = function ($event) {
		if (true) {
			$event.preventDefault();

			$('.loginModal').modal('show');
		}
	};

	$http.get('content/qa/categories.json').then(function (response) {
		$scope.categories = response.data;
	});

	$http.get(API + '/questions').then(function (response) {
		$scope.questions = response.data.questions;
	}, function (response) {
		console.log(response);
	});
});




app.controller('QAController-View', function ($scope, $routeParams, $location, $http, $auth) {
	var questionID = parseInt($routeParams.id);
	$scope.question = {};
	$scope.answer = {};

	if (!Number.isInteger(questionID)) {
		$location.path('/qa');
	}

	$scope.checkAuth = function () {
		if (true) { // if(loggedin)
			return true;
		} else {
			$('.loginModal').modal('show');
			return false;
		}
	};

	$scope.postAnswer = function () {
		if (!$scope.checkAuth()) {
			return;
		}

		$http.post(API + '/answers', $.param({
			questionid: questionID,
			userid:     1,
			body:       $scope.answer.body
		})).then(function (response) {
			if (response.data.success) {
				// Reset Form
				$scope.answer = {};

				// Refresh
				$http.get(API + '/question?id=' + questionID).then(function (response) {
					$scope.question = response.data.question;
				});
			} else {
				$scope.answer.error = response.data.error || 'Unknown Error';
			}
		}, function (response) {
			$scope.answer.error = 'Request failed';
			console.log(response);
		});
	};

	$scope.showModal = function () {
		$('.loginModal').modal('show');
	};

	$http.get(API + '/question?id=' + questionID).then(function (response) {
		if (response.data.success) {
			$scope.question = response.data.question;
		} else {
			$location.path('/qa');
		}
	}, function () {
		$location.path('/qa');
	});
});




app.controller('QAController-New', function ($scope, $http, $location, $auth) {
	$scope.categories = [];
	$scope.question = {};

	$scope.postQuestion = function () {
		var newQuestion = angular.copy($scope.question);

		// Validate
		if (newQuestion.title === '' || newQuestion.title === undefined) {
			$scope.question.error = 'Title is required';
			return;
		}

		if (newQuestion.body === '' || newQuestion.body === undefined) {
			$scope.question.error = 'Question is required';
			return;
		}

		if (newQuestion.category === '' || newQuestion.category === undefined) {
			newQuestion.category = 'other';
		}

		// Format
		newQuestion.category = newQuestion.category.toLowerCase();

		// Post to API
		$http.post(API + '/questions', $.param({
			userid:   1,
			title:    newQuestion.title,
			body:     newQuestion.body,
			category: newQuestion.category
		})).then(function (response) {
			if (response.data.success) {
				$location.path('/qa');
			} else {
				$scope.question.error = response.data.error || 'Unknown error';
			}
		}, function (response) {
			$scope.question.error = 'Request failed';
			console.log(response);
		});
	};

	$scope.cancel = function () {
		$location.path('/qa');
	};

	$http.get('content/qa/categories.json').then(function (response) {
		$scope.categories = response.data;
	});

	if (false) { // if (notloggedin)
		$location.path('/qa');
	}
});