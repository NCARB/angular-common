(function(angular) {
    'use strict';

    angular
        .module('ncarb.services.login')
        .directive('impersonationBanner', impersonationBanner);

    impersonationBanner.$inject = ['ClaimService', 'pathProvider', '$rootScope'];

    function impersonationBanner (ClaimService, pathProvider, $rootScope) {
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
            scope.unimpersonateUrl = pathProvider.stopImpersonating;
            setInfo(scope);
            $rootScope.$on('oauth:profile', function(event, token) {
                setInfo(scope);
            });
            $rootScope.$on('oauth:loggedOut', function(event, token) {
                setInfo(scope);
            });
        }
        
        function setInfo(scope) {
            scope.isImpersonating = ClaimService.isImpersonating();
            if(scope.isImpersonating) {
                scope.name = ClaimService.getFullName();
            }
        }
    }
})(window.angular);