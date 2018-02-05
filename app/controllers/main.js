app.controller('MainController', function ($rootScope, $scope, $location, $auth) {
	$scope.isActive = function (path) {
		return ('/' + $location.path().split('/')[1] === path);
	};

	$scope.getClassIfActive = function (path) {
		return ($scope.isActive(path)) ? 'active' : '';
	};

	$scope.collapseMenu = function () {
		$('.navbar-collapse').collapse('hide');
	};


	// root variables
	$rootScope.auth = $auth;
	$rootScope.isLoggedIn = false;
	$rootScope.username = '...';

	// Check if user is logged in. Due to Async HTTP Requests I have to use the .then() method
	$auth.isLoggedIn().then(function (response) {
		$rootScope.isLoggedIn = (response.data.success === true);

		if (response.data.success) {
			$rootScope.username = response.data.token.username;
		}

		// Special redirection (need it here because the HTTP Request is asynchronous)
		if ($location.path() === '/qa/new' && !$rootScope.isLoggedIn) {
			$location.path('/qa');
		}
	}, function (response) {
		console.log(response);
	});
});