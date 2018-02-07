angular.module('myApp.insert', ['ngRoute']).controller('insertController', ['$scope','$http', '$location','$routeParams', '$log','$window','AjaxService','detailService','$cookieStore',
function($scope,$http, $location,$routeParams, $log, $window,AjaxService,detailService,$cookieStore) {
 
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


  var self = $scope;

  self.createQuestion = {
    "question": {},
    "choice": [],
    "answer": []
  };

  self.addChoice = function (selected){
    self.createQuestion.choice.push(selected);
    self.question.choices = "";
  };

 self.addAnswers = function (selected){
    self.createQuestion.answer.push(selected);
    self.question.answer = "";
  };

  self.logout = function (selected){
    $cookieStore.remove('user');
   $location.path('/view1');

 };

  // ===== Scroll to Top ==== 
$(window).scroll(function() {
  if ($(this).scrollTop() >= 50) {        
    $('#return-to-top').fadeIn(200);    
  } else {
    $('#return-to-top').fadeOut(200);   
  }
});
$('#return-to-top').click(function() {      
  $('body,html').animate({
    scrollTop : 0                       
  }, 500);
});

  self.create = function (question){

    self.createQuestion.choice.push(question.choices);
    self.createQuestion.answer.push(question.answer);

    self.createQuestion = {
      "quizTitle" : question.quizTitle,
      "duration": question.duration,
      "questionLines": question.questionLine,
      "questions": question.questions,
      "choices": self.createQuestion.choice,
      "answer": self.createQuestion.answer
    };
    
    detailService.insertQuestions(self.createQuestion);
     console.log("detailService.fullQuestion==================>",detailService.fullQuestion);
    $http({

    method: 'POST',
    url: "http://localhost:8690" + '/details/insertDetails',
    headers: {
      'Content-Type': 'application/json'
    },
    data: detailService.fullQuestion
    }).then(function (data) {
       $location.path('/allQuestionsToAdmin'); 
    return data;

    }, function (error) {
    $log.log("Error while loading urls!");
    return 0;
    });

     self.createQuestion = {
    "question": '',
    "choice": '',
    "answer": ''
  };

  };

}]);
