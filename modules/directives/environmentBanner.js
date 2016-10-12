(function(angular) {
    'use strict';

    angular
        .module('ncarb.directives')
        .directive('environmentBanner', environmentBanner);

    environmentBanner.$inject = ['configuration'];

    function environmentBanner(configuration) {
        return {
            restrict: 'E',
            template: '<div ng-show="environment" class="environment-banner">{{environment}}</div>',
            replace: true,
            link: link
        };

        function link(scope) {
            if (configuration.environment === 'staging') {
                scope.environment = configuration.environment;
            }
        }
    }
})(window.angular);
