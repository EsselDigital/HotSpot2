(function() {

    var app = angular.module("myFrontend");

    var AboutController = function($http,$scope,$log,$stateParams,$location,$anchorScroll) {
        var jobs = this;
     	
     	// the element you wish to scroll to.
      	$location.hash('about');
	    // call $anchorScroll()
      	$anchorScroll();

      	//$log.log('AboutController $stateParams.id=',$stateParams.id);
     	//Close brandlisting menu
	 	 $(".navbar-collapse").collapse('hide');
     }

    app.controller("AboutController", AboutController);

}());