(function(angular) {
	'use strict';

	angular
		.module('ncarb.services.util')
		.service('ErrorService', ErrorService);

	ErrorService.$inject = [];

	/* @ngInject */
	function ErrorService() {
		
		this.parseApiModelStateError = parseApiModelStateError;

		////////////////

		function parseApiModelStateError(errorResult) {
			if (!errorResult || (!errorResult.data && !errorResult.message)) {
				return;
			}
			var error = errorResult.data || errorResult;
			if (error.message == "The request is invalid." && error.modelState) {
				var messages = [];
				for (var field in error.modelState) {
					messages.push(error.modelState[field].join(" and "));
				}
				return messages.join("; ") + (messages.length > 1 ? "." : "");
			} else if (error.message) {
				return error.message;
			}
		};
	}
})(window.angular);