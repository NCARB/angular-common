(function(angular) {
	'use strict';

	angular
		.module('ncarb.services')
		.service('Bootstrap', Bootstrap);

	Bootstrap.$inject = ['$rootScope', '$state', '$http', 'StorageService', 'history', 'configuration', '$window', 'ClaimService', 'UserService', 'pathProvider'];

	/* @ngInject */
	function Bootstrap($rootScope, $state, $http, StorageService, history, configuration, $window, ClaimService, UserService, pathProvider) {
		this.run = run;

		////////////////

		function run() {

			$rootScope.configuration = configuration;
			$rootScope.UserService = UserService;
			$rootScope.ClaimService = ClaimService;
			$rootScope.pathProvider = pathProvider;
			if (UserService.isAuthenticated()) {
				UserService.setAuthorizationHeader();
				UserService.setPolicies();
			}

			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
				if (toState.authenticate && !UserService.isAuthenticated()) {
					event.preventDefault();
					StorageService.setItem('authRetryState', toState.name);
					$state.transitionTo('login');
				}

				if (toState.name == 'LogOutAll') {
					if (toParams.logout != 'undefined' && toParams.logout == 1) {
						UserService.clear();
					} else {
						event.preventDefault();
						$state.transitionTo('login');
					}
				}
			});

			$rootScope.$on("$stateChangeSuccess", function(event, to, toParams, from, fromParams) {
				if (!from.abstract) {
					history.push(from, fromParams);
				}
				// close hamburger menu if open
				if ($("#ncarbNavmenu").hasClass('in')) {
					$('[data-toggle=offcanvas]').trigger('click.bs.offcanvas.data-api');
				}
			});

			$rootScope.$on('oauth:profile', function(event, profile) {
				StorageService.setItem('profile', profile);
			});

			$rootScope.$on('oauth:login', function(event, token) {
				UserService.setAuthorizationHeader();
				UserService.setPolicies();
			});

			$rootScope.$on('oauth:loggedOut', function() {
				// avoid initial broadcast on unlogged-in/credentialless entry
				// otherwise they are redirected to a login page which redirects to logout after login
				// tricky because in chrome, only, this redirect is canceled by loginCtrl endpoint redirect
				// policies are checked because token is cleared by now in both explicit logout and initial
				//  credientialless entry
				if (UserService.getPolicies()) {
					UserService.logOut();
				}
			});

			$rootScope.$on('oauth:expired', function() {
				UserService.logOut();
			});

			history.push($state.current, $state.params);

			$rootScope.$onMany = function(eventsString, fn) {
				angular.forEach(eventsString.split(" "), function (event) {
					$rootScope.$on(event, fn);
				});
        	};
		}
	}
})(window.angular);