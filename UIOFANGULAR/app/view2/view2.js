angular.module('myApp.view2', ['ngRoute']).controller('TestController', ['$scope','$document', '$location','$timeout','$routeParams', '$log','$window','AjaxService','detailService',
  function($scope,$document, $location,$timeout,$routeParams, $log, $window,AjaxService,detailService) {
   var self = $scope;
   self.id=0;
   self.reScore = 0;
   self.toIndex=[];
   self.choice={
    seleccted: {}
  }
  self.score={};
  self.defAnswer= {};
  $scope.interpretation = {};
  self.userScore={
    username:{},
    score:{}
  }
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

self.init = function () {
  document.getElementById("myCode").readOnly = true;
  AjaxService.allQuestions().then(function (response) {
   self.choice.selected = false;
   self.rest = response;
   self.toIndex = response.data;
   detailService.noOfQuestions(self.toIndex.length);
   self.allDetails = response.data[0];
   detailService.allQuestions(self.rest.data);
   self.defAnswer = self.allDetails.answer;
   detailService.defaultCorrectAnswer(self.defAnswer);
   self.serverData = self.rest;
   self.choice.selected = false;
 },function (error) {
  $log.log("Error while loading urls!");
});
  if ( $scope.allDetails && ($scope.challenge.selected === undefined) ){
    $window.alert("ANSWER_NEEDED");
  };
  self.countdown();
};
$scope.counter = 80;

var stopped;

$scope.countdown = function() {
  stopped = $timeout(function() {
    $scope.counter--; 
    var hours = Math.floor($scope.counter/3600);
    var minutes = Math.floor(($scope.counter-(hours*3600))/60);
    var seconds = $scope.counter - (hours*3600)-(minutes*60);
         //round seconds
         seeconds = Math.round(seconds*100)/100;
         var resultt = (hours<10?"0"+hours:hours);
         resultt+="-"+(minutes<10?"0"+minutes:minutes);
         resultt+="-"+(seconds<10?"0"+seconds:seconds);
        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML =  hours + "h "
        + minutes + "m " + seconds + "s ";

        if($scope.counter >= 0){

          if ($scope.counter=== 0){
            self.submit($scope.counter);
          }
          $scope.countdown();
        }
      }, 1000);
};

self.init();

self.selected = '';
self.next =true;
$scope.selection=[];
  
   $scope.toggleSelection = function toggleSelection(employeeName) {
     var idx = $scope.selection.indexOf(employeeName);
       if (idx > -1) {
           $scope.selection.splice(idx, 1);
       }else {
     $scope.selection.push(employeeName);
      }
   };

/*chrome.windows.onFocusChanged.addListener(function() {
    console.log("Focus changed.");

    chrome.windows.getCurrent(function(window){
        console.log(window.state);
        if(window.state == "normal") {
            console.log("It's normal.Stop the watch.");
        } else if(window.state == "maximized"){
            console.log("It's maximized.Start the watch.");
        } else if(window.state == "minimized"){
        console.log("It's minimized.Start the watch.");
        }
    });
});
*/
/*function scrollToTop(scrollDuration) {
  var scrollStep = -window.scrollY / (scrollDuration / 15),
  scrollInterval = setInterval(function(){
    if ( window.scrollY != 0 ) {
      window.scrollBy( 0, scrollStep );
    }
    else clearInterval(scrollInterval); 
  },15);
};

// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange; 
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

var videoElement = document.getElementById("div1");

// If the page is hidden, pause the video;
// if the page is shown, play the video
function handleVisibilityChange() {
  if (document[hidden]) {
   self.logout();
 //window.alert("Are you not fullfill the test");
 //window.location('/view1');
 location.path('/view1');
 console.log("hidden====================>");

 videoElement.pause();
} else {
//window.location('/view1');
  //  window.alert("Plese at this page!!");
    //videoElement.play();
  }
}

// Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
  console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
  // Handle page visibility change   
  document.addEventListener(visibilityChange, handleVisibilityChange, false);

  // When the video pauses, set the title.
  // This shows the paused
  videoElement.addEventListener("pause", function(){
    location.path('/view1');
    document.title = 'Paused';
  }, false);

  // When the video plays, set the title.
  videoElement.addEventListener("play", function(){
    document.title = 'Playing'; 
  }, false);

};*/
//At Focus
/*window.onfocus = function() { }*/ 
window.onblur = function() {
  window.alert("Please reopen this page because of dont make browser minimise and open the new tab");
  location.path('/view1');
} 
self.logout= function(){
  $location.path('/view1');
  console.log("go to another page=============>");
};
  //resize just happened, pixels changed
  $(window).resize(function() {
    window.alert("please");
    console.log("go to another page=============>");
  });



  self.next = function (choice){
   $('body,html').animate({
    scrollTop : 0                       
  }, 500);
   var result = $scope.selection.length == detailService.correctAnswer.length && $scope.selection.every(function(element, index) {
    return ($.inArray(element,detailService.correctAnswer) != -1)
//return element === detailService.correctAnswer[index]; 
});

   if(result === true){
    self.reScore++;
    console.log("self.reScore==================>",self.reScore);
  }

  $scope.selection = [];
  self.selected = choice;
  console.log("choice==================>>>",angular.toJson(choice));
  if ( self.selected.selected == detailService.correctAnswer) {
    self.reScore++;
    detailService.totalScoreFunction(self.reScore);
  }
  self.id++;

  self.allDetails  = detailService.ToUse(self.id);
  console.log("self.allDetails==================>",self.allDetails);
  self.defAnswer = self.allDetails.answer;
  detailService.defaultCorrectAnswer(self.defAnswer);

      //If you not answered
      if (self.selected.selected === "false") {
        $window.alert( "ANSWER_NEEDED" );
        self.id--;
        self.id--;
        self.next(self.selected.selected);
      }         
      if (self.id > self.toIndex.length - 2) {
        self.next =false;
      }
      self.selected = "";
      self.choice.selected = false;
    };



    self.choice={};

    self.submit = function (choice){
     var result = $scope.selection.length == detailService.correctAnswer.length && $scope.selection.every(function(element, index) {
      return element === detailService.correctAnswer[index]; 
    });
      
     if(result === true){

      self.reScore++;
      console.log("self.reScore==================>",self.reScore);
    }

    $scope.selection = [];
    detailService.totalScoreFunction(self.reScore);

    self.selected = choice;
    if ( self.selected.selected == self.allDetails.answer) {

      self.reScore++;
      
      detailService.totalScoreFunction(self.reScore);

      self.userId= 1;
      userScore.username = detailService.loggedUser.username;
      userScore.mark = self.reScore;
      // AjaxService.scoreUpdate(parseInt(detailService.loggedUser.id),self.reScore);
      // AjaxService.scoreUpdate((detailService.loggedUser.username),self.reScore);
      AjaxService.scoreUpdate(userScore);
    }
    if ( (self.selected.selected != self.allDetails.answer) || (self.selected.selected == undefined) ) {

      self.userId= 1;
      self.userScore.username = detailService.loggedUser.username;
      self.userScore.mark = self.reScore;
      AjaxService.scoreUpdate(self.userScore);
      // AjaxService.scoreUpdate((detailService.loggedUser.username),self.reScore);
      // AjaxService.scoreUpdate(parseInt(detailService.loggedUser.id),self.reScore);
    }
    console.log("self.rescore===================>",self.reScore)
      //If you not answered
      if (self.selected.selected === "false") {

        $window.alert( "ANSWER_NEEDED" );
        self.id--;
        self.id--;
        self.next(self.selected.selected);
      }         

      $location.path('/score');
    }; 
  }]);

