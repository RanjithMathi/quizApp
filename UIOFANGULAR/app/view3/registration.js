'use strict';

angular.module('myApp.register', ['ngRoute']).controller('registerController', ['$scope','$location','$log','AjaxService','$rootScope',
 function($scope,$location,$log,AjaxService,$rootScope) {
	 $scope.departments = ["CSE", "IT", "ECE","EEE","MECH","MCA"];
$scope.onRegister = function (user) {

      $scope.user = {
				"name": user.name,
				"college": user.collegeName,
				"department":user.department,
				"username":user.userName,
				"password": user.password,
				"phno": user.phoneNumber,
				"email": user.email,
				"mark" :"0",
				"role": "USER"
			};
  AjaxService.signIn($scope.user).then(function (response) {
    self.rest =response;

     if(self.rest.data.responseSuccess === "You have create a user successfully!"){
                 $scope.success = "You have create a user successfully!";
                }
 
      if (response) {
        $rootScope.$broadcast("Notify", {
          message: "sign up succesfull",
          type: "error",
          layout: "bar",
          effect: 'slidetop'
        });
        $location.url('/view1');
        } else {
        $rootScope.$broadcast("Notify", {
          message: "Error occured",
          type: "error",
          layout: "bar",
          effect: 'slidetop'
        });
        $location.url('/signup');
      }
   });
 };
}]);
