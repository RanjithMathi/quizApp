angular.module('myApp.sampleText', ['ngRoute']).
controller('sampleText', ['$scope','$http', '$location','$routeParams', '$log','$window','AjaxService','detailService',
function($scope,$http, $location,$routeParams, $log, $window,AjaxService,detailService) {

  var self = $scope;

  
  self.create = function(sample){
self.sampleText = sample;
console.log("sampleText=================>"+self.sampleText);
  }
}]);
