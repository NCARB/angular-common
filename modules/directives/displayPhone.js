(function(angular) {
    'use strict';

    angular
        .module('ncarb.directives')
        .directive('displayPhone', function() {
        return {
            restrict: 'E',
            template: '<span>{{phone.phoneNumber}} ({{phone.phoneType}})</span>',
            replace: true,
            scope: {
                phone: '=ngModel',
                hideType: '='
            }
        };
    });
})(window.angular);
