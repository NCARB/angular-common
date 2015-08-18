(function(angular) {
    'use strict';
    // http://stackoverflow.com/questions/25818757/set-angularjs-nested-forms-to-submitted
    angular
        .module('ncarb.directives')
        .directive('form', function() {
          return {
            restrict: 'E',
            require:  'form',
            link: function(scope, elem, attrs, parent) {
              scope.$watch(function() {
                return parent.$submitted;
              }, function(submitted) {
                scope.$broadcast('$parentSubmitted', submitted);
              });
            }
          };
        })
        .directive('ngForm', function() {
          return {
            restrict: 'EA',
            require:  'form',
            link: function(scope, elem, attrs, nestedForm) {
              scope.$on('$parentSubmitted', function(submitted) {
                nestedForm.$setSubmitted(submitted);
              }); 
            }
          };
        });

})(window.angular);
