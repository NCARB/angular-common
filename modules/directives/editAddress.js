(function(angular) {
    'use strict';

    angular
        .module('ncarb.directives')
        .directive('editAddress', function() {
        return {
            restrict: 'E',
            template: '<div ng-form="addressForm" class="flex-container flex-gutters">\
    <div class="flex-item" feedback>\
        <select name="country" ng-required="!hidden" ng-options="country.id as country.name for country in (countries | orderBy: \'name\')" ng-model="address.countryId" ng-change="countryIdChanged()"></select>\
    </div>\
    <div class="flex-item" feedback>\
        <input name="streetLine1" ng-required="!hidden" type="text" placeholder="Company" ng-model="address.streetLine1"/>\
    </div>\
    <div class="flex-item">\
        <input name="streetLine2" type="text" placeholder="Street" ng-model="address.streetLine2" />\
    </div>\
    <div class="flex-item flex-fill" feedback>\
        <input name="city" ng-required="!hidden" type="text" placeholder="City"  ng-model="address.city" />\
    </div>\
    <div class="flex-item flex-collapse" ng-show="IsUsAddress()" feedback>\
        <select name="state" ng-required="!hidden && IsUsAddress()" ng-options="state.id as state.code for state in (states | filter: { countryId: usa.id })" ng-model="address.stateId" ng-change="stateIdChanged()"></select>\
    </div>\
    <div class="flex-item flex-collapse" ng-show="IsCaAddress()" feedback>\
        <select name="province" ng-required="!hidden && IsCaAddress()" ng-options="state.id as state.code for state in (states | filter: { countryId: canada.id })" ng-model="address.provinceId" ng-change="provinceIdChanged()"></select>\
    </div>\
    <div class="flex-item flex-collapse" ng-show="IsForeignAddress()">\
        <input type="text" ng-model="address.stateProvenceOrRegionText" placeholder="Region" />\
    </div>\
    <div class="flex-item flex-collapse" feedback>\
        <input ng-required="!hidden && !IsForeignAddress()" name="zip" type="text" ng-model="address.zip" ng-attr-placeholder="IsUsAddress() ? \'Zip Code\' : \'Postal Code\'" placeholder="Postal Code"  zip-pattern-by-country-id />\
    </div>\
</div>',
            replace: true,
            require: '^form',
            scope: {
                address: '=ngModel',
                states: '=',
                countries: '=',
                hidden: '=ngHide'
            },
            controller: function($scope) {
                var _ = window._;
                this.usa = $scope.usa = _.find($scope.countries, function(country) {
                    return country.code === 'USA';
                });
                this.canada = $scope.canada = _.find($scope.countries, function(country) {
                    return country.code === 'CAN';
                });
                this.getAddress = function() {
                    return $scope.address;
                };

                $scope.countryIdChanged = function() {
                    $scope.address.countryText = _.find($scope.countries, function(country) {
                        return country.id === $scope.address.countryId;
                    }).name;
                    $scope.address.stateId = null;
                    $scope.address.provinceId = null;
                    $scope.address.stateProvinceOrRegionText = null;
                    $scope.$broadcast('countryIdChanged', $scope.address.countryId);
                };

                $scope.stateIdChanged = function() {
                    var state = _.find($scope.states, function(state) {
                        return state.id === $scope.address.stateId;
                    });
                    $scope.address.stateProvinceOrRegionText = state ? state.code : null;
                };

                $scope.provinceIdChanged = function() {
                    var province = _.find($scope.states, function(state) {
                        return state.id === $scope.address.provinceId;
                    });
                    $scope.address.stateProvinceOrRegionText = province ? province.code : null;
                };
            },
            link: function(scope, elem, attrs, form) {
                var _ = window._;

                scope.IsUsAddress = function() {
                    return scope.address.countryId === scope.usa.id;
                };
                scope.IsCaAddress = function() {
                    return scope.address.countryId === scope.canada.id;
                };          
                scope.IsForeignAddress = function() {
                    return !scope.IsUsAddress() && !scope.IsCaAddress();
                };

                if(!scope.address.countryId) {
                    scope.address.countryId = scope.address.country 
                    ? scope.address.country.id
                    : scope.usa.id;
                }
            }
        };
    });      
})(window.angular);
