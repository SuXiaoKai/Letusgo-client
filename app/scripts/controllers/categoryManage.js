'use strict';

angular.module('letusgo')
  .controller('CategoryManageCtrl', function ($scope,CategoryManageService,$routeParams) {

      CategoryManageService.loadAllCategories(function(categories){
        $scope.categories = categories;
        $scope.category = _.find($scope.categories,function(category){
          var id = $routeParams.id || 0;
          return category.id.toString() === id.toString();
        });
      });

      $scope.add = function(){
        CategoryManageService.insert($scope.name,function(data){
          $scope.categories = data;
        });
      };

      $scope.$emit('highLightActive','category');

      $scope.remove = function(index){
        $scope.categories.splice(index,1);
      };
      $scope.$watch('categories',function(){
        CategoryManageService.add($scope.categories);
      },true);

      $scope.updateCategory = function(){
        CategoryManageService.updateCategory($scope.category);
      };
  });
