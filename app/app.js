// Create angular module
var app = angular.module('DevRantDocs', ['ngRoute', 'hljs']);

// Routing-Configuration
app.config(['$routeProvider', '$locationProvider', '$sceProvider', '$httpProvider', function ($routeProvider, $locationProvider, $sceProvider, $httpProvider) {
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

		$sceProvider.enabled(false);

		$httpProvider.defaults.headers.post = {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
		};
	}
]);

// Constants
const API = 'http://skayo.lima-city.at';