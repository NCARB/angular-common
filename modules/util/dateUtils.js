(function(window, angular) {
  'use strict';
  
  angular.module('ncarb.services.util')
  .service('dateUtils', dateUtils);

  function dateUtils() {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return {
      toTicks: toTicks,
      addDays: toTicks,
      endOfMonth: endOfMonth,
      today: today,
      todayOrLater: todayOrLater
    };

    function toTicks(date, additionalDays) {
      if (!date || !date.getTime) {
        return null;
      }
      var ticks = date.getTime();
      if (additionalDays) {
        ticks += +additionalDays * 1000 * 60 * 60 * 24;
      }
      return ticks;
    }
    
    function endOfMonth(date) {
      if(!date) {
        return date;
      }
      return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    }
    
    function todayOrLater(date) {
      return today <= date;
    }
  }
})(window, window.angular);
