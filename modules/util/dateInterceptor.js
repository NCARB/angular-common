(function(window, angular) {
  'use strict';
  
  angular.module('ncarb.services.util')
    .provider('dateInterceptor', dateInterceptorProvider);
    
  function dateInterceptorProvider() {
    this.$get = function() {
      return {
        response: response,
        request: request
      };
    };
    
    function response(response) {
      convertJsonToDates(response.data);
      return response;
    }
    
    function convertJsonToDates(obj) {
      for (var key in obj) {
        var value = obj[key];
        var type = typeof value;
        if (type === 'string') {
          if(/^\d{4}-\d{2}-\d{2}T/.test(value)) {
            var dateArray = value.split('T')[0].split('-');
            var timeArray = value.split('T')[1].split('.')[0].split(':');
            var date = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2],
                                    +timeArray[0], +timeArray[1], +timeArray[2], 0);
            date.setFullYear(+dateArray[0]);
            obj[key] = date;
          }
        } else if (type === 'object') {
          convertJsonToDates(value);
        }
      }
    }
  
    function request(config) {
      convertDatesToJson(config.data);
      return config;
    }
    
    function pad(num) {
      return (num < 10 ? '0' : '') + num;
    }
    
    function convertDatesToJson(obj) {
      if (typeof obj !== 'object') {
        return;
      }

      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        var value = obj[key];
        if (value && angular.isDate(value) && !isNaN(value)) {
          obj[key] = value.getFullYear() + '-' + pad(value.getMonth() + 1) + '-' + pad(value.getDate())
          + 'T' + pad(value.getHours()) + ':' + pad(value.getMinutes()) + ':' + pad(value.getSeconds());
        } else if (typeof value === 'object') {
          convertDatesToJson(value);
        }
      }
    }
  }
})(window, window.angular);
