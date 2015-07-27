(function(angular) {
    'use strict';

    angular
        .module('ncarb.directives')
        .directive('editAddress', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/directives/editAddress.html',
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

                scope.showErrors = function(formElement) {
                    return (scope.address && scope.address.id || form.$$parentForm.$submitted || formElement.$dirty) && formElement.$invalid;
                };
            }
        };
    });      
})(window.angular);
