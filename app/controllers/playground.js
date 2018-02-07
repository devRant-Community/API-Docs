app.controller('TestingAreaController', function ($scope, $http, $location) {
	$scope.method = 'GET';
	$scope.url = '';
	$scope.parameters = [
		{index: 0, key: 'app', value: '3'}
	];
	$scope.response = null;

	$scope.setMethod = function (method) {
		$scope.method = method;
	};

	$scope.addParameter = function () {
		$scope.parameters.push({index: $scope.parameters.length});
	};

	$scope.removeParameter = function (index) {
		$scope.parameters.splice(index, 1);
	};

	$scope.doRequest = function () {
		var parameters = {};
		$scope.parameters.forEach(function (item) {
			parameters[item.key] = item.value;
		});

		var url = 'https://devrant.com/api/' + $scope.url;

		if ($scope.method === 'POST') {
			$http({
				method: $scope.method,
				url:    url,
				data:   parameters
			}).then(function successCallback(response) {
				$scope.response = JSON.stringify(response.data, null, '  ');
			}, function errorCallback(response) {
				console.log(response);
				$scope.response = 'An error occurred';
			});
		} else {
			$http({
				method: $scope.method,
				url:    url,
				params: parameters
			}).then(function successCallback(response) {
				$scope.response = JSON.stringify(response.data, null, '  ');
			}, function errorCallback(response) {
				console.log(response);
				$scope.response = 'An error occurred';
			});
		}
	};

	// Autocomplete Stuff
	$scope.currentAutocomplete = [];
	$scope.showDots = false;
	$scope.dropdownHover = false;
	var autocomplete = {};
	var autocompleteList = null;

	function getAutocompleteList() {
		return Object.keys(autocomplete).sort();
	}

	$scope.onInputKeyUp = function () {
		var url = $scope.url;
		var urlRegex = new RegExp('^(' + url.replace('/', '\\/') + ')', 'g');
		$scope.showDots = false;
		$scope.currentAutocomplete = [];
		$('#playground-url-autocomplete').hide();

		autocompleteList.forEach(function (item) {
			var match = item.match(urlRegex);
			if (match !== null) {
				$scope.currentAutocomplete.push({pre: match[0], post: item.replace(match[0], '')});
			}
		});

		if ($scope.currentAutocomplete.length > 4) {
			$scope.currentAutocomplete = $scope.currentAutocomplete.slice(0, 4);
			$scope.showDots = true;
		}

		if ($scope.currentAutocomplete.length > 0) {
			$('#playground-url-autocomplete').show();
		}
	};

	$scope.autocompleteEndpoint = function (endpoint) {
		$scope.url = endpoint;
		var parameters = autocomplete[endpoint];
		$scope.parameters = [];

		Object.keys(parameters).forEach(function (item, index) {
			var newParamter = {};
			newParamter.key = item;
			newParamter.value = parameters[item];
			newParamter.index = index;
			$scope.parameters.push(newParamter);
		});

		$('#playground-url-autocomplete').hide();
	};

	$http.get('content/playground/autocomplete.json').then(function (response) {
		autocomplete = response.data;
		autocompleteList = getAutocompleteList();

		if ($location.search().endpoint) {
			// If endpoint get-parameter passed, autofill form
			var endpoint = $location.search().endpoint;

			if (endpoint.startsWith('/')) {
				endpoint = endpoint.slice(1);
			}

			if (autocompleteList.indexOf(endpoint) > -1) {
				$scope.autocompleteEndpoint(endpoint);
			} else {
				$scope.url = endpoint;
			}
		}
	});

	$('#playground-url-autocomplete')
		.css('width', $('#inputUrl').outerWidth())
		.hide();

	$('#inputUrl')
		.focusout(function () {
			if (!$scope.dropdownHover) {
				$('#playground-url-autocomplete').hide();
			}
		})
		.focusin(function () {
			if ($scope.currentAutocomplete.length > 0) {
				$('#playground-url-autocomplete').show();
			}
		});
});