(function (window, angular) {
	'use strict';

	angular.module('ncarb.services.util')
		.factory('breakpoints', [function() {
		    var breakpoints = {
		        xs: 480,
		        sm: 768,
		        md: 960,
		        lg: 1260
		    };
		    
		    function isWithin(breakpoint) {
		        return $(window).width() <= this.breakpoints[breakpoint];
		    }
		    
			return {
			    breakpoints: breakpoints,
			    isWithin: isWithin
			};
			
    }]);
})(window, window.angular);