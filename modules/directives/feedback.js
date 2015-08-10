(function(angular) {
    'use strict';

    angular
        .module('ncarb.directives')
	    .directive('feedback', ['$interpolate', function($interpolate) {
	        return {
	            restrict: 'A',
	            require: ['^form', '?^multiFeedback'],
	            link: link
	        };

	        function link(scope, el, attrs, controllers) {
	        	var formCtrl = controllers[0];
	        	var multi = controllers[1];
	        	
	            var options, inputEl, inputName, inputNgEl, showSuccess, showIcons;
	            options = attrs.feedback && attrs.feedback.split(",") || [];
	            showSuccess = options.indexOf("success") > -1;
	            showIcons = options.indexOf("icons") > -1;
	            
	            inputEl = el[0].querySelector('[name]');
	            if(showIcons) {
	                el.addClass("has-feedback");
	                $(inputEl).parent().append("<span class='form-control-feedback'></span>");
	            }
	            inputNgEl = angular.element(inputEl);
	            inputName = $interpolate(inputNgEl.attr('name') || '')(scope);
	            if (!inputName) {
	              throw "feedback directive has no child input elements with a 'name' attribute";
	            }
	            var inputFullName = formCtrl.$name + '.' + inputName;
	            if(multi) {
                	multi.add(inputFullName, showSuccess);
	            }
	            var blurred = inputNgEl.attr('datepicker-popup') !== undefined;
	            if(!blurred) {
	                inputNgEl.bind('blur', function() {
	                    blurred = true;
	                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
	                    if(showSuccess) {
	                        el.toggleClass('has-success', !!(formCtrl[inputName].$valid && formCtrl[inputName].$viewValue));
	                    }
	                    if(multi) {
	                    	multi.update(inputFullName, formCtrl[inputName].$valid);
	                    }
	                });
	            }
	            
	            var errorWatch = inputFullName +'.$invalid && ('+ inputFullName+ '.$dirty || ' + formCtrl.$name + '.$submitted)';
	            scope.$watch(errorWatch, function (hasError) {
	                if(blurred || formCtrl.$submitted) {
	                    el.toggleClass('has-error', hasError);
	                    if(multi) {
	                    	multi.update(inputFullName, formCtrl[inputName].$valid);
	                    }
	                }
	            });
	            if(showSuccess || multi) {
	                var successWatch = inputFullName+'.$valid && ('+ inputFullName +'.$dirty || ' + formCtrl.$name + '.$submitted)';
	                scope.$watch(successWatch, function (hasSuccess) {
	                    if(blurred || formCtrl.$submitted) {
	                    	if(showSuccess) {
	                        	el.toggleClass('has-success', !!(hasSuccess && formCtrl[inputName].$viewValue));
	                    	}
	                    	if(multi) {
	                    		multi.update(inputFullName, formCtrl[inputName].$valid);
	                    	}
	                    }
	                });
	            }
	        }
	    }]);

})(window.angular);