app.controller('MainController', function ($scope, $location) {
	$scope.isActive = function (path) {
		return ($location.path() === path);
	};

	$scope.getClassIfActive = function (path) {
		return ($scope.isActive(path)) ? 'active' : '';
	};
});