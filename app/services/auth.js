function Auth($rootScope, $http) {
	this.URLs = {
		login:      API + '/auth/login',
		checkToken: API + '/auth/check-token'
	};

	// Login
	this.login = function (loginForm, confirmSignUp = false) {
		var self = this;
		loginForm.error = "";

		$http.post(this.URLs.login, $.param({
			username: loginForm.username,
			password: loginForm.password,
			confirmSignUp: confirmSignUp
		})).then(function(response) {
			if(response.data.success === true) {
				loginForm.username = loginForm.password = "";
				self.setTokenData(response.data.token);
				$rootScope.isLoggedIn = true;
				$('.loginModal').modal('hide');
			} else if(response.data.confirmNeeded) {
				loginForm.confirmNeeded = true;
			} else {
				loginForm.error = response.data.error;
			}
		}, function(response) {
			console.log(response);
		});

		// Update Scope
		$rootScope.login = loginForm;
	};

	// Check if user is logged in
	this.isLoggedIn = function () {
		var token = this.getTokenData();

		return $http.post(this.URLs.checkToken, $.param({
			token_id: token.id,
			token_key: token.key
		}));
	};

	this.getTokenData = function () {
		var token = {};

		token.id = localStorage.getItem('token_id'); // Null if not existing
		token.key = localStorage.getItem('token_key');

		return token;
	};

	this.setTokenData = function (tokenData) {
		localStorage.setItem('token_id', tokenData.id);
		localStorage.setItem('token_key', tokenData.key);
	};
}

app.service('$auth', Auth);