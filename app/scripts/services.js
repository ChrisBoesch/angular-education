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
    .factory('commonAPIs',function(){
      return function commonAPIs(res) {
        return {
          all: function() {
            return res.query().$promise;
          },
          getById: function(id) {
            return res.get({id: id}).$promise;
          }
        };
      };
    })
    .factory('alerts', function() {
      var alerts = {
        INFO: 'info',
        SUCCESS: 'success',
        WARNING: 'warning',
        DANGER: 'danger',

        counter: 1,
        messages: [],

        push: function(msg, level) {
          var message;

          message = {
            id: this.counter++,
            level: level ? level : this.INFO,
            content: msg
          };

          this.messages.push(message);
          return message;
        },

        remove: function (message) {
          for (var i = 0; i < this.messages.length; i++) {
            if (this.messages[i].id === message.id) {
              return this.messages.splice(i, 1).pop();
            }
          }
        }
      };

      ['info', 'success', 'warning', 'danger'].forEach(function(level) {
        alerts[level] = function(msg) {
          return this.push(msg, level);
        };
      });

      return alerts;
    })

  ;

}());
