	var app = angular.module('myApp').service("detailService", ["$log","$http","$window",function ($log, $http, $window) {
		var self = this;
		self.fullInformation = {};
		self.fullQuestion = {};
		self.scoreInformation = {};
		self.totalOfQuestions = {};
		self.correctAnswer = {};
		self.loggedUser = {};
		self.userDetails =[];
		self.userIdtoAd = {};
		self.isLoggedIn = true;

		self.insertQuestions = function (fulldetails) {
			self.fullQuestion = angular.copy(fulldetails);
		}; 

		self.loggedUserDetails = function (fulldetails) {
			self.loggedUser = angular.copy(fulldetails);
			console.log("self.loggedUser===========>",self.loggedUser);
		}; 

		self.userDetailsToAdmin = function (fulldetails) {
			self.userDetails = angular.copy(fulldetails);
		}; 

		self.defaultCorrectAnswer = function (fulldetails) {
			self.correctAnswer = angular.copy(fulldetails);
		}; 

		self.allQuestions = function (fulldetails) {
			self.fullInformation = angular.copy(fulldetails);
		};
		self.totalScoreFunction = function (fromIfConditionScore) {
			self.scoreInformation = angular.copy(fromIfConditionScore);
			
		};

		self.noOfQuestions = function (totalQuest) {
			self.totalOfQuestions = angular.copy(totalQuest);
			
		};
		
		self.ToUse = function (id) {
			return  self.fullInformation[id];
		};

		self.loggedUserId = function (idea) {
			self.userIdtoAd = angular.copy(idea);
			
		};

	}]);
