app.controller('TestingAreaController', function ($scope, $http, $sce) {
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
		$sce.trustAsResourceUrl('https://devrant.com/api/**');

		console.log(url);

		if ($scope.method == 'POST') {
			$http({
				method: $scope.method,
				url:    url,
				data:   parameters
			}).then(function successCallback(response) {
				$scope.response = JSON.stringify(response, null, '  ');
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
				$scope.response = JSON.stringify(response, null, '  ');
			}, function errorCallback(response) {
				console.log(response);
				$scope.response = 'An error occurred';
			});
		}
	};

	/*
	 $.ajax({
	 type: "POST",
	 url: 'contact',
	 dataType: 'json',
	 cache: false,
	 data: $('#contact-form').serialize(),
	 success: function(data) {

	 if(data.info !== 'error'){
	 $this.parents('form').find('input[type=text],input[type=email],textarea,select').filter(':visible').val('');
	 message.hide().removeClass('success').removeClass('error').addClass('success').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
	 window.grecaptcha.reset();
	 } else {
	 message.hide().removeClass('success').removeClass('error').addClass('error').html(data.msg).fadeIn('slow').delay(5000).fadeOut('slow');
	 }
	 }
	 });
	 */
});