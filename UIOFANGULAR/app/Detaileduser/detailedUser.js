angular.module('myApp.detailedUser', ['ngRoute']).controller('detailedUserontroller', ['$scope', '$location', '$log', 'AjaxService','detailService','$rootScope',
    function($scope, $location, $log, AjaxService,detailService,$rootScope) {
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

         self.init = function (userId){
         	
        AjaxService.detailedUser(detailService.userIdtoAd).then(function (response) {
        	/*$rootScope.details = response.data;*/
    self.allUsers = response.data;
    self.first =self.allUsers[0].firstName;
    self.last =self.allUsers[0].lastName;
    self.email = self.allUsers[0].email;
    self.phone = self.allUsers[0].phone;
    self.username = self.allUsers[0].userName;
    self.password = self.allUsers[0].password;
    self.score = self.allUsers[0].score;
   
       });

       };
       self.init();

  self.logout = function (selected){
       $location.path('/view1');
       $cookieStore.remove('user');
       };


}]);