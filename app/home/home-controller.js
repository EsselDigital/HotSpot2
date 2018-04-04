(function() {
    var app = angular.module("myFrontend");

    var HomeController = function($rootScope, $log, $location, $anchorScroll) {
        var home = this;
        this.items = [];
        for (var i = 0; i < 1000; i++) {
            this.items.push(i);
        }

    }

    app.controller("HomeController", HomeController);

}());