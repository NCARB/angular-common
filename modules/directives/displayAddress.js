(function(angular) {
    'use strict';

    angular
        .module('ncarb.directives')
        .directive('displayAddress', function() {
        return {
            restrict: 'E',
            template: '<span>{{address.streetLine1}}<br/>' +
                        '{{address.streetLine2}}<br ng-show="address.streetLine2" />' +
                        '{{address.city}}, {{address.stateProvinceOrRegionText}} {{address.zip}}' +
                      '<span ng-if="address.countryId != 840"><br/>{{address.countryText}}</span>',
            replace: true,
            scope: {
                address: '=ngModel'
            }
        };
    });
})(window.angular);
