(function(window, angular) {

    'use strict';
    angular.module('ncarb.directives')
        .directive('utc', function() {
            return {
                restrict: 'A',
                priority: 1,
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    
                    // prevDate is used as a fallback when a person is manually entring a date
                    // the parser balks at a three-digit year
                    // obviously it's an error, we have faith the person is
                    // on their way to the fourth digit
                    var prevDate = null;
                    
                    function utcToDate(date) {
                        if (date && angular.isString(date) && date.indexOf("T") > -1) {
                            date = date.substring(0, 10).split('-');
                            date = new Date(+date[0], +date[1] - 1, +date[2]);
                        }
                        return date;
                    }
                    function utcToTicks(date) {
                        date = utcToDate(date);
                        return date && date.getTime ? date.getTime() : null;
                    }
                    scope.utcToDate = utcToDate;
                    scope.utcToTicks = utcToTicks;
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
                    
                    ngModel.$parsers.unshift(function(date) {
                        if (date && angular.isString(date)) {
                            var splits = date.split("/");
                            if(splits.length == 3 && splits[2].length == 3 && prevDate) {
                                return prevDate;
                            }
                        }
                        prevDate = date;
                        return date;
                    });
                    
                    ngModel.$parsers.push(function(date) {
                        if (date && date.toUtcString) {
                            return date.toUtcString();
                        }
                        return date;
                    });

                    ngModel.$formatters.push(function(value) {
                        var date = utcToDate(value);
                        prevDate = date;
                        return date;
                    });
                }
            };
        });
})(window, window.angular);