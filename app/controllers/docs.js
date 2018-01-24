app.controller('DocsController', function ($scope, $location) {
	if(localStorage.getItem('examples-language') === null) {
		$scope.language = 'php';
		localStorage.setItem('examples-language', $scope.language);
	} else {
		$scope.language = localStorage.getItem('examples-language');
		$('.code-language-option.active').removeClass('active');
		$('.language-' + $scope.language).addClass('active');
	}

	$scope.setLanguage = function(lang) {
		if(lang == $scope.language)
			return;

		$('.language-' + $scope.language).removeClass('active');
		$scope.language = lang;
		localStorage.setItem('examples-language', $scope.language);
		$('.language-' + $scope.language).addClass('active');
	};
});