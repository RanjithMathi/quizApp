angular.module('myApp.userdetailswithScore', ['ngRoute']).controller('userdetailswithscoreToAdmin', ['$scope', '$location','$routeParams', '$log','$window','AjaxService','detailService','$cookieStore',
function($scope, $location,$routeParams, $log, $window,AjaxService,detailService,$cookieStore) {
   var self = $scope;

$(window).resize(function() {
  var path = $(this);
  var contW = path.width();
  if(contW >= 751){
    document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
  }else{
    document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
  }
});
$(document).ready(function() {
  $('.dropdown').on('show.bs.dropdown', function(e){
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
  });
  $('.dropdown').on('hide.bs.dropdown', function(e){
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp(300);
  });
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    var elem = document.getElementById("sidebar-wrapper");
    left = window.getComputedStyle(elem,null).getPropertyValue("left");
    if(left == "200px"){
      document.getElementsByClassName("sidebar-toggle")[0].style.left="-200px";
    }
    else if(left == "-200px"){
      document.getElementsByClassName("sidebar-toggle")[0].style.left="200px";
    }
  });
});

   self.id=0;
   self.toIndex=[];
   self.choice={
    seleccted: {}
   }
   self.totalScore = detailService.scoreInformation;
   self.totalQuestions = detailService.totalOfQuestions;
   self.total = self.totalScore/self.totalQuestions;
   self.percentage = self.total*100;
   console.log("self.totalScore================>",self.totalScore);
   console.log("self.percentage=================>",self.percentage)
  
self.selected = '';
   self.next =true;
   self.btnTitle ="continue";
   
     self.userDetails ={
    "email":[],
"firstName" :[],

"lastName" :[],
"password" : [],
"phone" :[],

"score" :[],
"userName" :[]
    };

      self.detaileduser = function (userId){
        detailService.loggedUserId(userId);
         console.log("self.allUsers============>");
          $location.path('/detailedUser');

       };

self.choice={};
self.init = function(){
  AjaxService.allUsersToAdmin().then(function (response) {
    self.allUsers = response.data;
    console.log("response.data============>",response.data);
    for (var i = 0; i < response.data.length; i++) {
     detailService.userDetailsToAdmin(response.data[i]);

            }

  });
}
self.init();


       self.logout = function (selected){
       $location.path('/view1');
       $cookieStore.remove('user');
       };
      
 self.insert = function (selected){
       $location.path('/insert');

       };



$scope.showSidebar1 = false;
      $scope.showSidebar2 = false;
      $scope.showSidebar3 = false;
      $scope.collapsedSidebar2 = false;
      $scope.collapsedSidebar2 = false;
      $scope.collapsedSidebar3 = false;
      $scope.toggleSidebar1 = function() {
        if ($scope.showSidebar1) {
          $scope.showSidebar1 = false;
        } else {
          $scope.showSidebar1 = true;
        }
      };
      $scope.toggleSidebar2 = function() {
        if ($scope.showSidebar2) {
          $scope.showSidebar2 = false;
        } else {
          $scope.showSidebar2 = true;
        }
      };
      $scope.toggleSidebar3 = function() {
        if ($scope.showSidebar3) {
          $scope.showSidebar3 = false;
        } else {
          $scope.showSidebar3 = true;
        }
      };







}]);
