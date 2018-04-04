(function() {

    var app = angular.module("myFrontend");

    app.factory('UserService', function() {
        return {
            name: 'anonymous'
        };
    });
})