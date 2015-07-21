// https://github.com/angular-ui/ui-router/issues/92#issuecomment-57345190
(function (window, angular) {
    'use strict';
    
    angular.module('ncarb.services.util')
    .service("history", ['$state', '$rootScope', '$window', 
    function($state, $rootScope, $window) {

      var history = [];
    
      angular.extend(this, {
        push: function(state, params) {
          history.push({ state: state, params: params });
        },
        all: function() {
          return history;
        },
        go: function(step) { 
          // TODO:
          // (1) Determine # of states in stack with URLs, attempt to
          //    shell out to $window.history when possible
          // (2) Attempt to figure out some algorthim for reversing that,
          //     so you can also go forward
    
          var prev = this.previous(step || -1);
          return $state.go(prev.state, prev.params);
        },
        previous: function(step) {
          return history[history.length - Math.abs(step || 1)];
        },
        back: function() {
          return this.go(-1);
        }
      });
    }
  ]);
})(window, window.angular);
