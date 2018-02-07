angular.module('myApp.sideDas', ['ngRoute']).controller('sideDashController', ['$scope', '$location', '$log', 'AjaxService','detailService','$rootScope','$cookieStore',
    function($scope, $location, $log, AjaxService,detailService,$rootScope,$cookieStore) {
   var self = $scope;
$(document).ready(function(){
$("#mytable #checkall").click(function () {
        if ($("#mytable #checkall").is(':checked')) {
            $("#mytable input[type=checkbox]").each(function () {
                $(this).prop("checked", true);
            });

        } else {
            $("#mytable input[type=checkbox]").each(function () {
                $(this).prop("checked", false);
            });
        }
    });
    
    $("[data-toggle=tooltip]").tooltip();
});
self.reportFn = function (total){
	
   console.log("college=============>");
   console.log("total=============>",total);
  // $location.path('/view1');
   AjaxService.userByFilter(total).then(function (response) {
	    console.log("response===========>",response.data);
	    self.userDetailsFiltered = response.data;

	     });
 };
self.logout = function (selected){
    $cookieStore.remove('user');
   $location.path('/view1');

 };

}]);