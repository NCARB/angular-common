(function(angular) {
    'use strict';

    angular
        .module('ncarb.directives')
        .directive('urlHelper', urlHelper);

    function urlHelper() {
        link.$inject = ['scope', 'elem', 'attrs', 'ngModel'];
        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };
    }

    function link(scope, elem, attr, ngModel) {
        elem.bind('blur', function() {
            if(ngModel.$viewValue && !/^(http|https):\/\//.test(ngModel.$viewValue)) {
                ngModel.$setViewValue('http://' + ngModel.$viewValue);
                ngModel.$render();
            }
        });
    }
})(window.angular);
