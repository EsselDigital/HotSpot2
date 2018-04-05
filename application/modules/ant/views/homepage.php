<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?>
<!doctype html>
<html ng-app="myFrontend" >
  <head>
    <script type="text/javascvript">
        var loginUser = null;
    </script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/> <!--320-->    
    <title>Video Annotator</title>
    <meta name="description" content="Video Annotator description here">
    <link href="resources/css/bootstrap.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <link rel="stylesheet" href="resources/css/angular-toastr.min.css">
    <link rel="stylesheet" href="resources/css/index.css">
    <link rel="stylesheet" href="resources/css/video-js.css">
	<script src="resources/js/jquery.js"></script>
     <script src="resources/kendo/js/angular.min.js"></script>

     <!-- carousel -->
     <link rel="stylesheet" href="resources/js/bower_components/owl.carousel/dist/assets/owl.carousel.css">
    <link rel="stylesheet" href="resources/js/bower_components/owl.carousel/dist/assets/owl.theme.default.css">
    <script src="resources/js/bower_components/owl.carousel/dist/owl.carousel.js"></script>
    <script src="resources/js/angular-owl-carousel-2.js"></script>

    <!-- end -->

    <!-- Kendo UI -->
    <script src="resources/kendo/js/jszip.min.js"></script> <!-- For Saving to Excel -->
    <link href="resources/kendo/styles/kendo.common.min.css" rel="stylesheet">
    <link href="resources/kendo/styles/kendo.rtl.min.css" rel="stylesheet">
    <link href="resources/kendo/styles/kendo.bootstrap.min.css" rel="stylesheet">
    <script src="resources/kendo/js/kendo.all.min.js"></script>

     <script src="resources/js/metisMenu.min.js"></script>
     <script src="resources/js/md5.js"></script>

    

    <script src="resources/js/angular-owl-carousel-2.js"></script>

     <!--Firebase code -->
     <script src="https://www.gstatic.com/firebasejs/4.1.2/firebase.js"></script>
    
    <script type="text/javascript" src="https://cdn.firebase.com/libs/angularfire/1.1.4/angularfire.min.js"></script>
    
  </head>
  <body>
    <div id="noJS">Please enable javascript...</div>
    <div id="site">
    <div>
        <acme-navbar></acme-navbar>
	</div>
	<div>
	        <acme-sidebar></acme-sidebar>
	</div>
    <div ui-view></div>

    <!-- Footer -->
    <footer>
      <div class="container ">
        <div class="row">
          <div class="col-lg-12">
      
            <p class="copyright text-muted small">Copyright &copy;Z5 2017. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
    </div>
    <script src="resources/js/angular-ui-router.js"></script>
    <script src="resources/js/ui-bootstrap-tpls.js"></script>
    <script src="resources/js/angular-toastr.tpls.js"></script>
    <script src="resources/js/moment.js"></script>
    <script src="resources/js/bootstrap.js"></script>
    <script src="resources/js/video.js"></script>
    <script src="resources/js/vjs-video.min.js"></script>
    <script src="resources/js/videojs-contrib-hls.min.js"></script>

    <script src="resources/js/youtube.min.js"></script>
    <script src="resources/js/app.js"></script> 
     <script src="app/components/navbar/navbar-directive.js"></script> 
     <script src="app/components/sidebar/sidebar-directive.js"></script> 
    <script src="app/main/main-controller.js"></script> 
    <!--<script src="app/login/login-controller.js"></script>-->
    <script src="app/home/home-controller.js"></script> 
    <script src="app/dashboard/dashboard-controller.js"></script> 
    <script src="app/home/home-controller.js"></script> 
    <script src="app/videos/videos-controller.js"></script> 
    <script src="app/elements/elements-controller.js"></script> 
    <script src="app/videoplayer/videoplayer-controller.js"></script> 
    <script src="app/about/about-controller.js"></script> 
    <script src="app/dataservices/data-services.js"></script>
    <script src="app/dataservices/user-services.js"></script>
     <script src="app/admin/admin-controller.js"></script> 

    <script>
  
    $(function() {
       // $('#side-menu').metisMenu();

          
    });

    //Loads the correct sidebar on window load,
    //collapses the sidebar on window resize.
    // Sets the min-height of #page-wrapper to window size
    $(function() {
        $(window).bind("load resize", function() {
            var topOffset = 50;
            var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
            if (width < 768) {
                $('div.navbar-collapse').addClass('collapse');
                topOffset = 100; // 2-row-menu
            } else {
                $('div.navbar-collapse').removeClass('collapse');
            }

            var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $("#page-wrapper").css("min-height", (height) + "px");
            }
        });

        var url = window.location;
        // var element = $('ul.nav a').filter(function() {
        //     return this.href == url;
        // }).addClass('active').parent().parent().addClass('in').parent();
        var element = $('ul.nav a').filter(function() {
            return this.href == url;
        }).addClass('active').parent();

        while (true) {
            if (element.is('li')) {
                element = element.parent().addClass('in').parent();
            } else {
                break;
            }
        }
    });
    </script>
    <script>
          $(document).ready(function() {
              $("#noJS").hide();
              $("#site").show();
          });
        </script>
    <script type="text/javascript">
        
    </script>
  </body>
</html>
