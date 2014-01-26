(function() {
  'use strict';

  angular.module('app.services', [])

    // Simple event bus implementation
    .factory('event', function() {
      var cache = [];
      return {
        on: function(event, fn) {
          cache[event] = cache[event] || [];
          cache[event].push(fn);
        },

        trigger: function(event, data) {
          var arr = cache[event] || [];
          angular.forEach(arr, function(fn) {
            fn.call(null, data);
          });
        }
      };
    })

  ;

}());
