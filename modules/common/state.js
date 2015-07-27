(function (window, angular) {
	'use strict';

	angular.module('ncarb.services.common')
		.factory('State', ['$resource', 'configuration', function ($resource, configuration) {
			return $resource(configuration.apiBaseUri + 'states', {}, {
				query: { method: 'GET', isArray: true }
			});
	}]);
		
})(window, window.angular);
