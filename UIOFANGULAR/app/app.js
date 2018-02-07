'use strict';

// Declare app level module which depends on views, and components
var app =angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'duScroll',
  'myApp.view1',
  'myApp.view2',
  'myApp.score',
  'myApp.register',
  'myApp.insert',
  'myApp.questionToAdmin',
  'angularUtils.directives.dirPagination',
  'myApp.userdetailswithScore',
  'snulvin.ulv-multi-sidebar',
  'myApp.side',
  'myApp.sideDas',
  'myApp.detailedUser',
  'myApp.sampleText',
  /*'myApp.quiz',*/
  'myApp.landUser',
  'scrollto',
  'myApp.userFilter',
  
]);
app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'loginController'
  }).when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'TestController',
     resolve:{
                    "check":function($location,$rootScope, $cookieStore){
               if($cookieStore.get('user')){
               $location.path('/view2');
                }else{
                $location.path('/view1');    //redirect user to home.
                }
              }
            }

  }).when('/side', {
    templateUrl: 'sidebar_Responsive/sidebarRes.html',
    controller: 'sideController',
     resolve:{
                    "check":function($location,$rootScope, $cookieStore){
               if($cookieStore.get('user')){
               $location.path('/side');
                }else{
                $location.path('/view1');    //redirect user to home.
                }
              }
            }
  }).when('/userByFilter', {
    templateUrl: 'usersByFilter/userFilter.html',
    controller: 'userFilterController'
  }).when('/sidedash', {
	    templateUrl: 'sidebarwithdash/sidebarwithDash.html',
	    controller: 'sideDashController'
	  }).when('/detailedUser', {
    templateUrl: 'DetailedUser/detailedUser.html',
    controller: 'detailedUserontroller',
     resolve:{
                    "check":function($location,$rootScope, $cookieStore){
               if($cookieStore.get('user')){
               $location.path('/detailedUser');
                }else{
                $location.path('/view1');    //redirect user to home.
                }
              }
            }
  }).when('/sampleText', {
    templateUrl: 'InsertQuestion/InsertTextFor.html',
    controller: 'sampleText'
  }).when('/landUser', {
    templateUrl: 'LandingUserPage/LandingUser.html',
    controller: 'landUserController'
  }).when('/userdetailswithScore', {
    templateUrl: 'userdetailswithscore/userdetailswithScore.html',
    controller: 'userdetailswithscoreToAdmin',
    resolve:{
                    "check":function($location,$rootScope, $cookieStore){
               if($cookieStore.get('user')){
               $location.path('/userdetailswithScore');
                }else{
                $location.path('/view1');    //redirect user to home.
                }
              }
            }

  }).when('/allQuestionsToAdmin', {
    templateUrl: 'QuestionsAdmin/AllQuestionsToAdmin.html',
    controller: 'questionToAdminController',
     resolve:{
                    "check":function($location,$rootScope, $cookieStore){
               if($cookieStore.get('user')){
               $location.path('/allQuestionsToAdmin');
                }else{
                $location.path('/view1');    //redirect user to home.
                }
              }
            }
  }).when('/insert', {
    templateUrl: 'InsertQuestion/insertQuestion.html',
    controller: 'insertController',
     resolve:{
                    "check":function($location,$rootScope, $cookieStore){
               if($cookieStore.get('user')){
               $location.path('/insert');
                }else{
                $location.path('/view1');    //redirect user to home.
                }
              }
            }
  }).when('/score', {
    templateUrl: 'score/score.html',
    controller: 'scoreController',
     resolve:{
                    "check":function($location,$rootScope, $cookieStore){
               if($cookieStore.get('user')){
               $location.path('/score');
                }else{
                $location.path('/view1');    //redirect user to home.
                }
              }
            }
  }).when('/signup', {
    templateUrl: 'view3/registration.html',
    controller: 'registerController'
  });

  $routeProvider.otherwise({redirectTo: '/landUser'});
 
}]);
app.run(function ($rootScope, $location) {
 

    $rootScope.$on('$stateChangeSuccess', function() {
   document.body.scrollTop = document.documentElement.scrollTop = 0;
});
});