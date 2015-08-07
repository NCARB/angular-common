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
    <input phone ng-required="required" name="phone" ng-model="phone.phoneNumber" type="text" />\
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
    });
})(window.angular);
