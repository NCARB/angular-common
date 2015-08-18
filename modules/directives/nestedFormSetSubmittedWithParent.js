(function(angular) {
    'use strict';
    // http://stackoverflow.com/questions/25818757/set-angularjs-nested-forms-to-submitted
    angular
        .module('ncarb.directives')
        .directive('form', function() {
          return {
            restrict: 'E',
            require:  'form',
            link: function(scope, elem, attrs, form) {
              scope.$watch(function() {
                return form.$submitted;
              }, function(submitted) {
                if(submitted) {
                  scope.$broadcast('$parentSubmitted');
                }
              });
            }
          };
        })
        .directive('ngForm', function() {
          return {
            restrict: 'EA',
            require:  'form',
            link: function(scope, elem, attrs, nestedForm) {
              scope.$on('$parentSubmitted', function() {
                nestedForm.$setSubmitted();
              }); 
            }
          };
        });

})(window.angular);
