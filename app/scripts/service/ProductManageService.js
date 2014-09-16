'use strict';
angular.module('letusgo')
  .service('ProductManageService', function (localStorageService) {
    this.loadAllProducts = function () {
      return localStorageService.get('products');
    };
    this.add = function (products) {
      localStorageService.add('products', products);
    };

    this.insert = function(product){
      var products = this.loadAllProducts();
      var isExist = _.some(products,{name : name});
      var isAllFullIn = product.name && product.price && product.unit && product && !isExist;
      if(isAllFullIn){
        var id = parseInt(products[products.length-1].id) + 1;
        product.id = id;
        products.push(product);
      }
      return products;
    };

    this.updateProduct = function (product) {
      var products = localStorageService.get('products');
      _.forEach(products,function(item,index){
        if(item.id === product.id){
          products[index] = product;
        }
      });
      this.add(products);
      return product;
    };
    this.getProductByName = function(name){
      var products = localStorageService.get('products');
      return _.find(products,{name: name}) || {};
    };
  });
