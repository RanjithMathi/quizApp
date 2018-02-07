angular.module('myApp.questionToAdmin', ['ngRoute']).controller('questionToAdminController', ['$scope', '$location','$routeParams', '$log','$window','AjaxService','detailService','$cookieStore',
function($scope, $location,$routeParams, $log, $window,AjaxService,detailService,$cookieStore) {
   var self = $scope;

// ===== Scroll to Top ==== 
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});


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
  /* self.choice={
    seleccted: {}
   }*/
  
self.selected = '';
   self.next =true;
   self.btnTitle ="continue";
   

       self.addMoreQuest = function (){
       $location.path('/insert');

       };
        self.userDetailsto = function (){
       $location.path('/userdetailswithScore');

       };


       self.logout = function (selected){
    $cookieStore.remove('user');
   $location.path('/view1');

 };

 self.init = function (){
  AjaxService.allQuestionsToAdmin().then(function (response) {
    console.log("response===========>",response.data);
    self.QuestionsToAdmin = response.data;
    console.log("response===========>",self.QuestionsToAdmin[0].questions);
      // $location.path('/insert');
      self.reads = self.QuestionsToAdmin[0].questions;
      self.choices = self.QuestionsToAdmin[0].choices;

      console.log("self.choices===>",self.choices);

     });


       };
self.init();

}]);
