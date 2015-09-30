(function(angular) {
    'use strict';

    angular
        .module('ncarb.services.login')
        .directive('impersonationBanner', impersonationBanner);

    impersonationBanner.$inject = ['ClaimService', 'configuration', '$rootScope', '$timeout'];

    function impersonationBanner (ClaimService, configuration, $rootScope, $timeout) {
        var directive = {
            link: link,
            restrict: 'E',
            scope: true,
            transclude: true,
            template: '<div ng-show="isImpersonating" id="impersonation_banner">' +
                'You are impersonating {{name}}. <a class="stop" ng-href="{{unimpersonateUrl}}">Stop</a>' +
            '</div>'
        };
        return directive;

        function link(scope, element, attrs) {
            setInfo(scope);
            scope.unimpersonateUrl = configuration.getUnimpersonateUri();
            $rootScope.$on('oauth:login', function(event, token) {
                setInfo(scope);
            });
			$rootScope.$on('oauth:loggedOut', function(event, token) {
                setInfo(scope);
            });
        }
        
        function setInfo(scope) {
            $timeout(function() {
                scope.isImpersonating = ClaimService.isImpersonating();
                scope.name = ClaimService.getFullName();
            }, 10);
        }
    }
})(window.angular);