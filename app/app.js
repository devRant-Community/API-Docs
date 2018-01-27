// Create angular module
var app = angular.module('DevRantDocs', ['ngRoute', 'hljs']);

// Routing-Configuration
app.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function ($routeProvider, $locationProvider, $sceDelegateProvider) {
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
				templateUrl: 'views/qa/allQuestions.html',
				controller:  'QAController-Main'
			})
			.when('/qa/new', {
				templateUrl: 'views/qa/newQuestion.html',
				controller:  'QAController-New'
			})
			.when('/qa/:id', {
				templateUrl: 'views/qa/viewQuestion.html',
				controller:  'QAController-View'
			})
			.when('/links', {
				templateUrl: 'views/links.html',
				controller:  'LinkController'
			})
			.otherwise({
				redirectTo: '/'
			});

		// use the HTML5 History API
		$locationProvider.html5Mode(true);

		$sceDelegateProvider.resourceUrlWhitelist([
			'self',                    // trust all resources from the same origin
			'*://devrant.com/**'
		]);
	}
]);