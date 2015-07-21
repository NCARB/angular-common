(function(angular) {
    'use strict';

    angular
        .module('ncarb.directives')
        .directive('editPhone', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/editPhone.html',
            replace: true,
            require: '^form',
            scope: {
                phone: '=ngModel',
                phoneTypes: '=types',
                hideType: '=',
                required: '=ngRequired'
            },
            link: function(scope, elem, attrs, form) {
                if(scope.hideType && !scope.phone.type) {
                    scope.phone.phoneType = 'work';
                }
                scope.showErrors = function(formElement) {
                    return (scope.phone && scope.phone.id || form.$$parentForm.$submitted || formElement.$dirty) && formElement.$invalid;
                };
            }
        };
    });
})(window.angular);
