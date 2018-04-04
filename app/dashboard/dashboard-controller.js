(function() {

    var app = angular.module("myFrontend");

    var DashboardController = function($rootScope,$http,$scope,$log,$stateParams,$anchorScroll) {
        var videoplayer = this;
        $log.info("DashboardController init");
       
     }

    app.controller("DashboardController", DashboardController);

}());