(function(angular) {
    'use strict';

    angular
        .module('ncarb.directives')
        .directive('editPhone', function() {
        return {
            restrict: 'E',
            template: '<div ng-form="phoneForm" class="flex-container flex-gutters">\
  <div ng-hide="hideType" class="flex-item flex-collapse" feedback>\
    <select ng-required="required" name="phoneType" ng-options="phoneType.value as phoneType.text for phoneType in phoneTypes" ng-model="phone.phoneType"></select>\
  </div>\
  <div class="flex-item flex-fill" feedback>\
    <input valid-phone ng-required="required" name="phone" ng-model="phone.phoneNumber" type="text" />\
  </div>\
</div>',
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
            }
        };
    })
    
    .directive('validPhone', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, elem, attr, ctrl) {                    

                if (!ctrl) {
                    return;
                }

                var pattern = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,3})|(\(?\d{2,3}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;                   
                var validator = function(value) {

                    var isValid;
                    
                    if (!value) {
                        isValid = true;
                    } else {
                        isValid =  pattern.test(value);
                    }                        

                    ctrl.$setValidity('phone', isValid);

                    return value;
                };

                ctrl.$parsers.push(validator);
                ctrl.$formatters.push(validator);
            }
        };
    });
})(window.angular);
