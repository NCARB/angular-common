(function(window, angular) {
    'use strict';

    angular
        .module('ncarb.services.login')
        .service('UserService', UserService);

    UserService.$inject = ['StorageService', 'Endpoint', 'configuration', '$http', '$window', '$q', '$log'];

    function UserService(StorageService, Endpoint, configuration, $http, $window, $q, $log) {
        var user;
        var policies = null;
        var service = {
            user: user,
            policies: policies,
            setAuthorizationHeader: setAuthorizationHeader,
            isAuthenticated: isAuthenticated,
            clear: clear,
            logOut: logOut,
            refreshClaims: refreshClaims,
            canAccess: canAccess,
            setPolicies: setPolicies,
            isAdmin: isAdmin,
            getUser: getUser,
            getPolicies: getPolicies
        };

        return service;

        function setAuthorizationHeader() {
            var token = StorageService.getItem('token');

            if (token) {
                $http.defaults.headers.common.Authorization = 'Bearer ' + token.access_token;
            };
        };

        function isAuthenticated() {
            var token = StorageService.getItem('token');

            return !!token;
        };

        function clear() {
            user = null;
            policies = null;
            $http.defaults.headers.common.Authorization = '';
            StorageService.reset();
        };

        function logOut() {
            asyncFunction(clear)
                .then(function () {
                    $window.location.href = configuration.oauth.logout_uri;
                });
        };

        function refreshClaims() {
            $window.location.href = Endpoint.get();
        };

        function setPolicies() {
            var deferred = $q.defer();

            $http.get(configuration.apiBaseUri + "authorization")
                .success(function(data, status, headers, config) {
                    policies = data;
                    deferred.resolve(data);
                }).error(function(data, status, headers, config) {
                    $log.debug('getting policies failed');
                    deferred.reject(data);
                });

            return deferred.promise;
        };

        function canAccess(action, resource) {
            if (policies) {
                var policy = _.findWhere(policies, {
                    action: action,
                    resource: resource
                }) || _.findWhere(policies, {
                    action: "*",
                    resource: resource
                });

                if (policy) {
                    return policy.authorized;
                }
            }

            return false;
        };

        function isAdmin() {
            return canAccess('administer', 'Roster');
        };

        function getUser() {
            return user;
        };

        function getPolicies() {
            return policies;
        };

        function asyncFunction(functionPtr) {
            var defer = $q.defer();

            setTimeout(function() {
                functionPtr();
                defer.resolve(true);
            }, 500);

            return defer.promise;
        };
    }
})(window, window.angular);
