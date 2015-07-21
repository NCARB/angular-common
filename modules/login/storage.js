(function(angular) {
  'use strict'

  angular
    .module('ncarb.services.login')
    .service('StorageService', StorageService);

  StorageService.$inject = ['$localStorage'];

  function StorageService($localStorage) {
    var service = {
      reset: reset,
      setItem: setItem,
      getItem: getItem,
      removeItem: removeItem
    };

    return service;

    function reset() {
      $localStorage.$reset();
    }

    function setItem(key, value) {
      $localStorage[key] = value;
    }

    function getItem(key) {
      return $localStorage[key];
    }

    function removeItem(key) {
      delete $localStorage[key];
    }
  }

})(window.angular);