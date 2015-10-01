(function(angular) {
  'use strict';

  angular
    .module('ncarb.services.common')
    .service('pathProvider', pathProvider);

  pathProvider.$inject = ['configuration'];

  function pathProvider (configuration) {
    return {
      forPath: forPath,
      root: forPath(''),
      stopImpersonating: forPath('Dashboard/Account/StopImpersonating'),
      refreshClaims: forPath('Dashboard/Account/RefreshClaims')
    };
    
    function forPath(path) {
      return configuration.myncarb_uri + path;
    }
  }

})(window.angular);
