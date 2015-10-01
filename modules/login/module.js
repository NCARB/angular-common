(function(angular) {
    'use strict';

    angular
        .module('ncarb.services.login',['oauth', 'ncarb.services.common'])
        .constant('_', window._);

})(window.angular);