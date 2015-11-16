(function(angular) {
  'use strict'

  angular
    .module('ncarb.services.login')
    .service('StorageService', StorageService);

  StorageService.$inject = ['$localStorage'];

  function StorageService($localStorage) {
    var storageChecked = false;
    
    var service = {
      reset: storageAvailableWrapper(reset),
      setItem: storageAvailableWrapper(setItem),
      getItem: storageAvailableWrapper(getItem),
      removeItem: storageAvailableWrapper(removeItem)
    };

    return service;
    
    function storageAvailableWrapper(fun) {
      return function(param1, param2) {
        if (!storageChecked) {
          // Safari, in Private Browsing Mode, looks like it supports localStorage but all calls to setItem
          // throw QuotaExceededError. We're going to detect this and just silently drop any calls to setItem
          // to avoid the entire page breaking, without having to do a check at each usage of Storage.
          if (typeof $localStorage === 'object') {
            try {
              $localStorage.setItem('localStorage', 1);
              $localStorage.removeItem('localStorage');
            } catch (e) {
              alert('Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.');
            }
          }
          storageChecked = true;
        }
        return fun(param1, param2);
      };
    }

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