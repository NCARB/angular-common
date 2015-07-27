(function(window, angular) {

    'use strict';
    angular.module('ncarb.directives')
        .directive('utc', function() {
            return {
                restrict: 'A',
                priority: 1,
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {

                    function utcToDate(date) {
                        if (date && angular.isString(date) && date.indexOf("T") > -1) {
                            date = date.substring(0, 10).split('-');
                            date = new Date(+date[0], +date[1] - 1, +date[2]);
                        }
                        return date;
                    }
                    scope.utcToDate = utcToDate;
                    scope.oneDay = 1000 * 60 * 60 * 24;

                    function pad(number) {
                        if (number < 10) {
                            return '0' + number;
                        }
                        return number;
                    }
                    Date.prototype.toUtcString = function() {
                        var utcString = this.getFullYear() + "-" + pad(this.getMonth() + 1) + "-" + pad(this.getDate()) + "T00:00:00";
                        return utcString;
                    };
                    ngModel.$parsers.push(function(date) {
                        if (date.toUtcString) {
                            return date.toUtcString();
                        }
                        return date;
                    });

                    ngModel.$formatters.push(function(value) {
                        return utcToDate(value);
                    });
                }
            };
        });
})(window, window.angular);