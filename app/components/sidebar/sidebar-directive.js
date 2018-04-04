(function() {

    var app = angular.module("myFrontend");

    app.directive('acmeSidebar', function(){
    return {
      	restrict : 'E',
      	replace: true,
     	templateUrl: 'app/components/sidebar/sidebar.html',
	    controllerAs: 'vm',
	   // bindToController: true,
	    controller: function($rootScope,isAdmin,$scope,$timeout,$location,$http,$log,$window,DataService){
	    	var vm=this;
	    
		}

    }
  });

}());