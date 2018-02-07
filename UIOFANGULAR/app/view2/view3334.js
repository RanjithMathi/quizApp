angular.module('myApp.view2', ['ngRoute']).controller('TestController', ['$scope', '$location','$routeParams', '$log','$window','AjaxService','detailService',
function($scope, $location,$routeParams, $log, $window,AjaxService,detailService) {
   var self = $scope;
   self.id=0;
   self.toIndex=[];
   self.init = function () {

    AjaxService.allQuestions().then(function (response) {
     self.rest = response;
     self.toIndex = response.data;
     self.allDetails = response.data[0];
     detailService.allQuestions(self.rest.data);
     console.log("self.allDetails====================>",self.allDetails);
     self.serverData = self.rest;
    }, function (error) {
         $log.log("Error while loading urls!");
    });
    if ( $scope.allDetails && ($scope.challenge.selected === undefined) )
                      {
                          console.log( "ANSWER_NEEDED" );
                          $window.alert( "ANSWER_NEEDED" );
                          return;
                      }

   }
self.data = {
  selected: ''};

   self.init();
self.selected = '';
   self.next =true;
   self.btnTitle ="continue";
   self.next = function (choice){

     self.id++;
     self.selected = '';
     self.allDetails  = detailService.ToUse(self.id);
    //  $scope.selected = checked;
    //  if ( $scope.allDetails && ($scope.selected === undefined) )
    //                    {
    //                        console.log( "ANSWER_NEEDED" );
    //                        $window.alert( "ANSWER_NEEDED" );
    //                        return;
    //                    }
self.data.selected  = choice;
     console.log("self.selected===============================>",self.data.selected);
      if (self.id > self.toIndex.length - 2) {
         self.selected = '';
        self.next =false;
       }
        self.data.selected = '';
        console.log("self.selected===============================>",self.data.selected);
     };

     $scope.onTaskSelect = function(task) {
    // access your whole task object here.
    console.log("please improve============>",task.selected);    // will be true when you select it or else false
};
self.choice={};


     self.check = function (selected){
       self.data.selected = selected;
console.log("checked=============================>>");
       if ( $scope.allDetails && (self.selected === undefined) )
                         {
                             console.log( ANSWER_NEEDED );
                             $window.alert( ANSWER_NEEDED );
                             return;
                         }

        if (self.id > self.toIndex.length - 2) {
          self.next =false;
         }

       };


}]);
<input type="radio" name="choice" ng-model="data.selected"  ng-value="{{choice.index}}">


<button ng-click="logout()" 
         class="btn btn-success pull-right blue-btn" 
         <a href="/#!/score" class="blue">Logout</a>
          </button>



