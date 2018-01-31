app.controller('DocsController', function ($scope, $http, $timeout, $anchorScroll) {
	$scope.setLanguage = function (lang) {
		console.log(lang);
		if (lang === $scope.language) {
			return;
		}

		$('code.hljs').removeClass($scope.language);
		$scope.language = lang;
		localStorage.setItem('examples-language', $scope.language);
	};

	$scope.getElementLink = function (elementID) {
		return location.origin + '#' + elementID;
	};

	$http.get('content/docs/endpoints.json').then(function (response) {
		$scope.endpoints = response.data;
		$scope.endpointsList = [];

		$scope.endpoints.forEach(function (endpoint, i) {
			$scope.endpoints[i].langs = [];

			endpoint.exampleCode.forEach(function (lang) {
				$scope.endpoints[i].exampleCode[lang.langCode] = lang.code.join('\n');

				$scope.endpoints[i].langs.push({
					name: lang.name, langCode: lang.langCode
				});
			});

			$scope.endpoints[i].exampleResponse = endpoint.exampleResponse.join('\n');

			$scope.endpointsList.push(endpoint.endpoint);
		});

		$scope.endpoints.sort(function (a, b) {
			if (a.endpoint < b.endpoint) {
				return -1;
			}
			if (a.endpoint > b.endpoint) {
				return 1;
			}
			return 0;
		});
	});


	$timeout(function () {
		if (localStorage.getItem('examples-language') === null) {
			$scope.language = 'shell';
			localStorage.setItem('examples-language', $scope.language);
		} else {
			$scope.language = localStorage.getItem('examples-language');
		}

		$anchorScroll();
	});
});
