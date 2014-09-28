'use strict';

angular.module('letusgo')
    .service('CartService',function($http){

        this.get = function(callback){

            var service = this;

            $http.get('/api/cartItems').success(function(data){

              var cartItems = data || [];
              var cart = {cartItems: cartItems,
                          count: service.getTotalCount(cartItems)
                          };

              callback(cart);
            });
        };
        this.add = function(cart){
            $http.post('/api/cart',{cart:cart});
        };
        this.getTotalMoney = function(cart){
            var sum = 0;
            _.forEach(cart.cartItems,function(cartitem){
               sum += cartitem.product.price * cartitem.count;
            });
            return sum;
        };

        this.getTotalCount = function(cart){

          return _.reduce(_.pluck(cart.cartItems, 'count'), function (count1, count2) {
            return count1 + count2;
          });
        };

        this.getSubtotal = function(cartitem){
            return (cartitem.product.price * cartitem.count).toFixed(2);
        };
        this.remove = function(callback){
            $http.delete('/api/cart').success(function(data,status){
              if(status === 200){
                callback();
              }
            });
        };
    });

