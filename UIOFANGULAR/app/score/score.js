angular.module('myApp.score', ['ngRoute']).controller('scoreController', ['$scope', '$location','$routeParams', '$log','$window','AjaxService','detailService','$cookieStore',
  function($scope, $location,$routeParams, $log, $window,AjaxService,detailService,$cookieStore) {
    $(function(){
$('a[title]').tooltip();
});

    //Add optional jQuery  so animation works on click for mobile devices

$(".box").click(function(){
   $(this).box().toggleClass("circle");
});
     
   var self = $scope;
   self.id=0;
   self.toIndex=[];
   self.choice={
    seleccted: {}
  }
  self.totalScore = detailService.scoreInformation;
  self.totalQuestions = detailService.totalOfQuestions;
  self.total = self.totalScore/self.totalQuestions;
  self.percentage = self.total*100;
  
  self.selected = '';
  self.next =true;
  self.btnTitle ="continue";
  
   
  self.choice={};


  self.logout = function (selected){
    $cookieStore.remove('user');
   $location.path('/view1');

 };
 self.insert = function (selected){
   $location.path('/insert');

 };


}]);
