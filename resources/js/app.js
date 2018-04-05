(function() {

    var app = angular.module('myFrontend', ["kendo.directives", 'vjs.video', 'ui.router', 'ui.bootstrap', 'toastr', 'firebase', 'angular-owl-carousel-2'])
        .constant('moment', moment)
        .constant('isAdmin', window._isAdmin)
        .service(firebase.initializeApp({
            apiKey: "AIzaSyBQc5QYtuR8VHVqyj1Qk12Z8UimXxqtnAQ",
            authDomain: "authuser-a90fb.firebaseapp.com",
            databaseURL: "https://authuser-a90fb.firebaseio.com",
            projectId: "authuser-a90fb",
            storageBucket: "authuser-a90fb.appspot.com",
            messagingSenderId: "566334795154"
        }))
    app.config(["$urlRouterProvider", "$stateProvider", function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider

            .state('Landing', {
                url: '/',
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'dashboard'
            })
            .state('home', {
                url: '/home',
             templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'dashboard'
            })
            /*.state('login', {
                url: '/',
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'vm',

            })*/
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/dashboard/dashboard.html',
                controller: 'DashboardController',
                controllerAs: 'dashboard'
            })
            .state('admin', {
                url: '/admin',
                templateUrl: 'app/admin/admin.html',
                controller: 'AdminController',
                controllerAs: 'admin',
                resolve: {
                    allUsersDataSource: function(DataService) {
                        return DataService.getAllUsers();
                    },
                    allViewersDataSource: function(DataService) {
                        return DataService.getAllViewers();
                    },


                    allGamesDataSource: function(DataService) {
                        return DataService.getAllGames();
                    },

                },
            })
            .state('about', {
                url: '/about',
                templateUrl: 'app/about/about.html',
                controller: 'AboutController',
                controllerAs: 'about'
            })
            .state('videos', {
                url: '/videos',
                templateUrl: 'app/videos/videos.html',
                controller: 'VideosController',
                controllerAs: 'vm',
                resolve: {
                    allCategoriesDataSource: function(DataService) {
                        //return DataService.getAllCategories();
                        var cache = DataService.myCache;
                        var data = cache.get('categories');

                        if (data) {
                            console.log("Data category cached", data);
                            return data;
                        } else {
                            console.log("Data category NOT cached", data);
                            let res = DataService.getAllCategories(); // getAllCategoriesFromFirebase();
                            cache.put('categories', res);
                            var currentTime = new Date().getTime();
                            cache.put('cachedTime', currentTime);
                            console.log('cate ', res)
                            return res;
                        }
                    },
                    allContentDataSource: function(DataService) {
                        var cache = DataService.myCache;
                        var data = cache.get('videos');

                        if (data) {
                            console.log("Data cached", data);
                            return data;
                        } else {
                            console.log("Data NOT cached", data);
                            var res = DataService.getLatestVideos(); // getAllContentsFromFirebase();
                            cache.put('videos', res);
                            var currentTime = new Date().getTime();
                            cache.put('cachedTime', currentTime);
                            return res;
                        }
                        //return DataService.getAllContentsFromFirebase();
                        /*var cache = DataService.myCache;
                        var data = cache.get('videos');
                        if (data) {
                            console.log("Data cached", data);
                            return data;
                        } else {
                            var res = DataService.getLatestVideos(); // getAllContentsFromFirebase();
                            cache.put('videos', res);
                            var currentTime = new Date().getTime();
                            cache.put('cachedTime', currentTime);
                            return res;
                        }*/
                    }
                },
            })
            .state('elements', {
                url: '/elements',
                templateUrl: 'app/elements/elements.html',
                controller: 'ElementsController',
                controllerAs: 'vm',
                resolve: {
                    allElementsContents: function(DataService) {
                        var cache = DataService.myCache;
                        var data = cache.get('element_contents');
                        if (data) {
                            console.log("Data cached", data);
                            return data;
                        } else {
                            var res = DataService.getAllElementsDataFromFirebase();
                            cache.put('element_contents', res);
                            var currentTime = new Date().getTime();
                            cache.put('cachedTime', currentTime);
                            return res;
                        }
                    }
                }
            })
            .state('videoplayer', {
                url: '/videoplayer/:videoId',
                templateUrl: 'app/videoplayer/videoplayer.html',
                controller: 'VideoPlayerController',
                controllerAs: 'vm',
                params: {
                    videoId: null,
                    video: null
                },
                resolve: {
                    allElementsContents: function(DataService) {
                        var cache = DataService.myCache;
                        var data = cache.get('element_contents');
                        if (data) {
                            console.log("Data cached", data);
                            return data;
                        } else {
                            var res = DataService.getAllElementsDataFromFirebase();
                            cache.put('element_contents', res);
                            var currentTime = new Date().getTime();
                            cache.put('cachedTime', currentTime);
                            return res;
                        }
                    }
                }
            });

    }]);

}());