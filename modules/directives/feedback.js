(function(angular) {
    'use strict';

    angular
        .module('ncarb.directives')
	    .directive('feedback', ['$interpolate', function($interpolate) {
	        var link = function(scope, el, attrs, formCtrl) {
	            
	            var options, inputEl, inputName, inputNgEl, showSuccess, toggleClasses, showIcons;
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
	            var blurred = inputNgEl.attr('datepicker-popup') !== undefined;
	            if(!blurred) {
	                inputNgEl.bind('blur', function() {
	                    blurred = true;
	                    el.toggleClass('has-error', formCtrl[inputName].$invalid);
	                    if(showSuccess) {
	                        el.toggleClass('has-success', !!(formCtrl[inputName].$valid && formCtrl[inputName].$viewValue));
	                    }
	                });
	            }
	            
	            var errorWatch = inputFullName +'.$invalid && ('+ inputFullName+ '.$dirty || ' + formCtrl.$name + '.$submitted)';
	            scope.$watch(errorWatch, function (hasError) {
	                if(blurred || formCtrl.$submitted) {
	                    el.toggleClass('has-error', hasError);
	                }
	            });
	            if(showSuccess) {
	                var successWatch = inputFullName+'.$valid && ('+ inputFullName +'.$dirty || ' + formCtrl.$name + '.$submitted)';
	                scope.$watch(successWatch, function (hasSuccess) {
	                    if(blurred || formCtrl.$submitted) {
	                        el.toggleClass('has-success', !!(hasSuccess && formCtrl[inputName].$viewValue));
	                    }
	                });
	            }
	        };
	        return {
	            restrict: 'A',
	            require: '^form',
	            link: link
	        };
	    }])

})(window.angular);