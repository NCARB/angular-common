 (function(angular) {
    'use strict';

    angular
        .module('ncarb.directives')
        .directive('zipPatternByCountryId', function() {
        return {
            restrict: "A",
            require: ["ngModel", "^editAddress"],
            priority: -1,
            link: function(scope, el, attrs, controllers) {
                var ngModel = controllers[0];
                var editAddress = controllers[1];

                var regexpByCountry = {};
                regexpByCountry[editAddress.usa.id] = /^(\d{5}-\d{4}|\d{5})$/;
                regexpByCountry[editAddress.canada.id] = /[ABCEGHJKLMNPRSTVXY][0-9][ABCEGHJKLMNPRSTVWXYZ] ?[0-9][ABCEGHJKLMNPRSTVWXYZ][0-9]/;
                
                var validate = function(value) {
                    var regexp = regexpByCountry[editAddress.getAddress().countryId];
                    if(!regexp || !value || regexp.test(value)) {
                        ngModel.$setValidity('pattern', true);
                        return value;
                    }
                    else {
                        ngModel.$setValidity('pattern', false);
                        return;
                    }
                };
                var patternValidator = function(value) {
                     return validate(value);
                };
                
                ngModel.$formatters.push(patternValidator);
                ngModel.$parsers.push(patternValidator);

                scope.$on('countryIdChanged', function(event, countryId) {
                    patternValidator(ngModel.$viewValue);
                });
            }
        };
    });      
})(window.angular);