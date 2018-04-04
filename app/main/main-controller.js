(function() {
    var app = angular.module("myFrontend");

    var MainController = function($rootScope, $interval, $filter, $http, $scope, $log, $stateParams, toastr, $window, DataService, $location,
        loginUserInfo, $anchorScroll) {
        var main = this;
        //DataService.getPopularVideos();
        //DataService.getLatestVideos();

        var owlAPi;
        $scope.items = [1, 2, 3, 4, 5, 6, 7, 8, 10];

        $scope.properties = {
            // autoHeight:true,
            animateIn: 'fadeIn',
            lazyLoad: true,
            items: 5,
            margin: 10

        };

        $scope.ready = function($api) {
            owlAPi = $api;
        };
    }

    app.controller("MainController", MainController);

}());