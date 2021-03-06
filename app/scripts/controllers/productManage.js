'use strict';

angular.module('letusgo')
  .controller('ProductManageCtrl', function ($scope,ProductService,CategoryService,$routeParams) {

    ProductService.loadAllProducts(null,function(data){

      $scope.products = data;

      $scope.product = _.find($scope.products,function(product){

        var name = $routeParams.name || 0;
        return product.name.toString() === name.toString();
      });

      if($scope.product){
        CategoryService.getCategoryById($scope.product.categoryId,function(data){
          $scope.product.category = data;
        });
      }
    });

    CategoryService.loadAllCategories(function(data){
      $scope.categories = data;
    });

    $scope.remove = function(index){
      ProductService.delete($scope.products[index].id);
      $scope.products.splice(index,1);
    };

    $scope.updateProduct = function(){

      _.forEach($scope.products,function(product,index){
         if(product.id.toString() === $scope.product.id.toString()){
           $scope.products[index] = $scope.product;
         }
      });

      ProductService.updateProduct($scope.product);
    };

    $scope.$emit('highLightActive','product');

    $scope.add = function(){

      ProductService.insert($scope.product,function(data){
        
        $scope.products.push(data);
        $scope.product = null;
      });
    };
  });
