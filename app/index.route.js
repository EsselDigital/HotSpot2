export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    }) 
    .state('press', {
      abstract: true,
      url: '/press',
      templateUrl: 'app/press/press.html',
      controller: 'PressController',
      controllerAs: 'press'
    }).state('press.list', {
            url: '/list',
            // loaded into ui-view of parent's template
            templateUrl: 'app/press/press.list.html',
            onEnter: function(){
             // console.log("enter press.list");
            }
     })
     .state('press.detail', {
        url: '/:id',
        templateUrl: 'app/press/press.details.html',
           controllerAs: 'press',
        controller: function($scope, $stateParams,$log,$location){
            $scope.newsID = $stateParams.id;
            $log.log('$stateParams.id=',$stateParams.id.toString());
             $location.hash($scope.newsID.toString() );
          }
               
    }).state('about', {
      url: '/about',
      templateUrl: 'app/about/about.html',
      controller: 'AboutController',
      controllerAs: 'about'
    })
    .state('jobs', {
      abstract: true,
      url: '/jobs',
      templateUrl: 'app/jobs/jobs.html',
      controller: 'JobsController',
      controllerAs: 'jobs',
      onEnter: function(){
           //  console.log("enter jobs");
      }
        
    })
    .state('jobs.list', {
            url: '/list',
            // loaded into ui-view of parent's template
            templateUrl: 'app/jobs/jobs.list.html',
            onEnter: function(){
           //   console.log("enter jobs.list");
            }
     })
     .state('jobs.detail', {
        url: '/:id',
        templateUrl: 'app/jobs/jobs.details.html',
        controllerAs: 'jobs',
        controller: function($scope, $stateParams,$log,$location){
          $scope.jobID = $stateParams.id;
          $log.log('$stateParams.id=',$stateParams.id.toString());
           $location.hash($scope.jobID.toString() );

        },
       onEnter: function(){
             // console.log("enter jobs.detail");
         }
       
    });

  $urlRouterProvider.otherwise('/');
}
