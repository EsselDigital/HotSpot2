(function() {

	var app=angular.module('myFrontend', ["kendo.directives",'vjs.video','ui.router', 'ui.bootstrap', 'toastr'])
	.constant('moment', moment)
	app.config(["$urlRouterProvider","$stateProvider",function($urlRouterProvider,$stateProvider){
		 $urlRouterProvider.otherwise("/");
	 $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '../app_admin/main/main.html',
      controller: 'MainController',
      controllerAs: 'main',
      resolve: {
                   allUsersDataSource: function(DataService) {
                    return  DataService.getAllUsers();
                    },
                
                   

              },
    }) ;
 /*  .state('about', {
      url: '/about',
      templateUrl: 'app/about/about.html',
      controller: 'AboutController',
      controllerAs: 'about'
    })
    .state('videoplayer', {
      url: '/videoplayer',
      templateUrl: 'app/video/video.html',
      controller: 'VideoPlayerController',
      controllerAs: 'videoplayer'
    });*/






	}]);

}());
