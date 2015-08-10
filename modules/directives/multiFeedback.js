(function(angular) {
    'use strict';

    angular
        .module('ncarb.directives')
	    .directive('multiFeedback', function() {
	        return {
	            restrict: 'A',
	            require: 'multiFeedback',
	            controller: controller,
	            link: link
	        };
	        function controller($scope) {
	            var feedbacks = $scope.feedbacks = {};
	            var showSuccesses = false;
	            var labelWrapper;
	            this.add = function(inputFullName, showSuccess) {
	                feedbacks[inputFullName] = "registered";
	                showSuccesses = showSuccesses || showSuccess;
	            };
	            this.setLabelWrapper = function(span) {
	                labelWrapper = span;
	            };
	            this.update = function(inputFullName, state) {
	                feedbacks[inputFullName] = !!state;
	                var errors = false;
	                for(var feedback in feedbacks) {
	                    errors = errors || !feedbacks[feedback];
	                }
	                labelWrapper.toggleClass("has-error", errors);
	                if(showSuccesses) {
    	                var success = true;
    	                for(feedback in feedbacks) {
    	                    success = success && feedbacks[feedback] == true;
    	                }
	                    labelWrapper.toggleClass("has-success", success);
	                }
	            };
	        }
	        function link(scope, el, attrs, controller) {
	            var selector = attrs.multiFeedback || "label";
	            var label = el.find(selector).eq(0);
	            controller.setLabelWrapper(label.wrap("<span></span>").parent());
	        }
	    });

})(window.angular);