(function (window, angular) {
	'use strict';

	angular.module('ncarb.services.common')
		.factory('Country', ['$resource', 'configuration',
			function ($resource, configuration) {
				return $resource(configuration.apiBaseUri + 'countries', {}, {
					query: { method: 'GET', isArray: true }
				});
			}
	]);
		
})(window, window.angular);
