'use strict';

angular.module('ncarb.services.common')
	.service('JurisdictionService', ['$http', '$q', 'configuration', 
		function Registration($http, $q, configuration) {

		this.get = function() {

			var deferred = $q.defer();
			$http.get(configuration.apiBaseUri + 'jurisdictions')
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function() {
					deferred.resolve(false);
				});

			return deferred.promise;
		};

	}]);