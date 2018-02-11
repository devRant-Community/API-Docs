app.controller('QAController-Main', function ($scope, $http, $location, $rootScope, $auth) {
	$scope.categories = [];
	$scope.questions = [];
	$scope.activeCategory = ($location.search().category === undefined) ? 'all' : $location.search().category;
	$scope.search = ($location.search().search === undefined) ? '' : $location.search().search;
	$scope.searchCopy = angular.copy($scope.search); // Copy so the ng-model doesn't affect it.
	$scope.isSearch = !($location.search().search === undefined);
	$scope.loading = true;

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
		if ($scope.search === '') {
			return;
		}

		$location.search('search', $scope.search);
	};

	$scope.deleteSearch = function () {
		$location.search('search', null);
	};

	$scope.newQuestion = function ($event) {
		if (!$scope.isLoggedIn) {
			$event.preventDefault();

			$('.loginModal').modal('show');
		}
	};

	$scope.logOut = function () {
		localStorage.removeItem('token_id');
		localStorage.removeItem('token_key');

		$rootScope.isLoggedIn = false;
	};

	$scope.deleteQuestion = function (questionID) {
		var confirmed = window.confirm('Are you sure you want to delete this Question?');

		if (confirmed) {
			// Get token
			var token = $auth.getTokenData();

			$http.delete(API + '/questions?questionid=' + questionID + '&token_id=' + token.id + '&token_key=' + token.key).then(function (response) {
				if(response.data.success) {
					window.alert('Question successfully deleted.');

					// Refresh
					$http.get(API + '/questions?category=' + $scope.activeCategory + '&search=' + $scope.search).then(function (response) {
						$scope.questions = response.data.questions;
						$scope.loading = false;
					}, function (response) {
						console.log(response);
						$scope.loading = false;
					});
				} else {
					window.alert(response.data.error);
				}
			}, function (response) {
				window.alert('An error occurred while deleting question.');
				console.log(response);
			});
		}
	};

	$http.get('content/qa/categories.json').then(function (response) {
		$scope.categories = response.data;
	});

	$http.get(API + '/questions?category=' + $scope.activeCategory + '&search=' + $scope.search).then(function (response) {
		$scope.questions = response.data.questions;
		$scope.loading = false;
	}, function (response) {
		console.log(response);
		$scope.loading = false;
	});
});




app.controller('QAController-View', function ($scope, $routeParams, $location, $http, $auth) {
	var questionID = parseInt($routeParams.id);
	$scope.question = {};
	$scope.answer = {};
	$scope.loading = true;

	if (!Number.isInteger(questionID)) {
		$location.path('/qa');
	}

	$scope.postAnswer = function () {
		if (!$scope.isLoggedIn) {
			return;
		}

		// Get token
		var token = $auth.getTokenData();

		$http.post(API + '/answers', $.param({
			questionid: questionID,
			body:       $scope.answer.body,

			token_id:  token.id,
			token_key: token.key
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

	$scope.deleteAnswer = function (answerID) {
		var confirmed = window.confirm('Are you sure you want to delete this Answer?');

		if (confirmed) {
			// Get token
			var token = $auth.getTokenData();

			$http.delete(API + '/answers?answerid=' + answerID + '&token_id=' + token.id + '&token_key=' + token.key).then(function (response) {
				if(response.data.success) {
					window.alert('Answer successfully deleted.');

					// Refresh
					$http.get(API + '/question?id=' + questionID).then(function (response) {
						$scope.question = response.data.question;
					});
				} else {
					window.alert(response.data.error);
				}
			}, function (response) {
				window.alert('An error occurred while deleting answer.');
				console.log(response);
			});
		}
	};

	$http.get(API + '/question?id=' + questionID).then(function (response) {
		if (response.data.success) {
			$scope.question = response.data.question;
			$scope.loading = false;
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

		if (newQuestion.category === '' || newQuestion.category === undefined) {
			newQuestion.category = 'other';
		}

		// Format
		newQuestion.category = newQuestion.category.toLowerCase();

		// Get token
		var token = $auth.getTokenData();

		// Post to API
		$http.post(API + '/questions', $.param({
			title:    newQuestion.title,
			body:     newQuestion.body,
			category: newQuestion.category,

			token_id:  token.id,
			token_key: token.key
		})).then(function (response) {
			if (response.data.success) {
				$location.path('/qa/' + response.data.id);
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
});