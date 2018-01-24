// Create angular module
var app = angular.module('DevRantDocs', ['ngRoute', 'hljs']);

// Routing-Configuration
app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/docs.html',
				controller:  'DocsController'
			})
			.when('/playground', {
				templateUrl: 'views/playground.html',
				controller:  'TestingAreaController'
			})
			.when('/qa', {
				templateUrl: 'views/qa.html',
				controller:  'QAController'
			})
			.when('/links', {
				templateUrl: 'views/links.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	}
]);