(function() {

    var app = angular.module("myFrontend");

    app.directive('acmeNavbar', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/navbar/navbar.html',
            controllerAs: 'vmn',
            controller: 'navbarCtrl'
        };
    });


    // bindToController: true,
    app.controller('navbarCtrl', function($rootScope, $scope, $timeout, $location, $http, $log, $window, DataService,
        $compile) {
        var vmn = this;
        vmn.files = [];
        vmn.showGoPortal = false;
        vmn.isBackendPortal = false;

        vmn.showPurchaseGame = (!window._isDemo);
        vmn.showFollowUser = (!window._isDemo);

        //admin user and portal is not showing
        if (vmn.isuseradmin === true) {
            vmn.showGoAdmin = true;
        }
        this.goAdmin = function() {
            vmn.isBackendPortal = true;
            vmn.showGoAdmin = false;
            vmn.showGoPortal = true;
            $log.log("goAdmin vmn.isBackendPortal=", vmn.isBackendPortal);
        };

        DataService.onAuthStateChanged($rootScope);

        $scope.$on("changeLogStatus", function(event, data) {
            $log.log(" acmeNavbar  changeLogStatus", event, data);
            $scope.$watch('loginUser', function(v) {
                if (v) {
                    $rootScope.loginUser = v;
                    $('#login').hide();
                    $('#register').hide();
                } else {
                    $rootScope.loginUser = null;

                }
            });
        });

        // Login
        var lWindow = $('#myLoginWindow');
        var lDialog = null;
        this.loginHandler = function(e) {
            $log.log("it clicke");
            lWindow.kendoWindow({
                width: 500,
                title: "Please Login",
                modal: true,
                visible: false,
                resizable: false,
                close: function(e) {
                    vmn.hideImg = true;
                }

            });

            lDialog = lWindow.data("kendoWindow");
            var lContent = '<div class="row form-group" class="col-xs-12">';
            lContent += '    <div class="col-xs-1">Email</div>';
            lContent += '    <div class="col-xs-9"><input name="email"  ng-model="vmn.email" type="text" style="width:100%"  class="field_value form-control k-textbox" ></div>';
            lContent += '</div> '; //row

            lContent += '<div class="row form-group" class="col-xs-12">';
            lContent += '    <div class="col-xs-1">Password</div>';
            lContent += '        <div class="col-xs-9"><input name="password"  ng-model="vmn.password" type="password" style="width:100%"  class="field_value form-control k-textbox" ></div>';
            lContent += '    </div> '; //row


            lContent += ' <div class="row">';
            lContent += '      <div class="col-sm-1"> </div>';
            lContent += '      <div class="col-sm-7">';
            lContent += '          <button type="button" class="btn btn-primary " ng-click="vmn.login(e)" >';
            lContent += '           Login</button>';
            lContent += '          <button type="button" class="btn btn-default " ng-click="vmn.loginCancel(e)" >Cancel</button>';
            lContent += '          <button type="button" class="btn btn-default " ng-click="vmn.forgetPassword(e)" >Forget Password</button>';
            lContent += '      </div>';
            lContent += '  </div>';


            lDialog.content(lContent);

            var temp = $compile(lWindow.contents())($scope);
            lDialog.center();
            lDialog.open().element.closest(".k-window").css({
                top: 55,
                left: 450
            });;
        }; // end login handler

        this.loginCancel = function(e) {
            //firebase.auth().signOut();
            lDialog.close();
        };

        this.login = function(e) {
            var email = vmn.email;
            var password = vmn.password;
            this.err = null;

            DataService.login(email, password).then(function(res) {
                console.log('Logged in');
                if (res) {
                    $('#login').hide();
                    $('#register').hide();
                    //$('#curUser').show(loginUser);
                    //$scope.loginUser = 'loginUser1';
                    //$('#logout').show();
                    lDialog.close();
                }
            }).catch(function(err) {
                alert(err.toString());
                console.log('Not logged in', err);
            });
        };


        this.logoutHandler = function(e) {
            console.log('Logged out');
            firebase.auth().signOut();

            //$('#logout').hide();
            $('#login').show();
            $('#register').show();
            $location.path("/");
        };

        // Register
        var rWindow = $('#myRegisterWindow');
        var rDiglog = null;
        this.registerHandler = function(e) {
            $log.log("it clicke");
            rWindow.kendoWindow({
                width: 500,
                title: "User Registration",
                modal: true,
                visible: false,
                resizable: false,
                close: function(e) {
                    vmn.hideImg = true;
                }

            });

            rDialog = rWindow.data("kendoWindow");
            var lContent = '<div class="row form-group" class="col-xs-12">';
            lContent += '    <div class="col-xs-1">Name</div>';
            lContent += '    <div class="col-xs-9"><input name="name"  ng-model="vmn.name" type="text" style="width:100%"  class="field_value form-control k-textbox" ></div>';
            lContent += '</div> '; //row
            lContent += '<div class="row form-group" class="col-xs-12">';
            lContent += '    <div class="col-xs-1">Email</div>';
            lContent += '    <div class="col-xs-9"><input name="email"  ng-model="vmn.email" type="text" style="width:100%"  class="field_value form-control k-textbox" ></div>';
            lContent += '</div> '; //row

            lContent += '<div class="row form-group" class="col-xs-12">';
            lContent += '    <div class="col-xs-1">Password</div>';
            lContent += '        <div class="col-xs-9"><input name="password"  ng-model="vmn.password" type="password" style="width:100%"  class="field_value form-control k-textbox" ></div>';
            lContent += '    </div> '; //row


            lContent += ' <div class="row">';
            lContent += '      <div class="col-sm-3"> </div>';
            lContent += '      <div class="col-sm-5">';
            lContent += '          <button type="button" class="btn btn-primary " ng-click="vmn.register(e)" >';
            lContent += '           Register</button>';
            lContent += '          <button type="button" class="btn btn-default " ng-click="vmn.registerCancel(e)" >Cancel</button>';
            lContent += '      </div>';
            lContent += '  </div>';


            rDialog.content(lContent);

            var temp = $compile(rWindow.contents())($scope);
            rDialog.center();
            rDialog.open().element.closest(".k-window").css({
                top: 55,
                left: 450
            });;
        }; // end register

        this.registerCancel = function(e) {
            //firebase.auth().signOut();
            rDialog.close();
        };

        this.register = function(e) {
            var email = vmn.email;
            var password = vmn.password;
            var name = vmn.name;

            DataService.registerEmailUser(email, password, name).then(function(res) {
                rDialog.close();
                $('#login').hide();
                $('#register').hide();
            }).catch(function(err) {
                alert(err.toString());
            });
        };



        // Reset password
        var fWindow = $('#myForgetPasswordWindow');
        var fDiglog = null;
        this.forgetPassword = function(e) {
            lDialog.close();
            $log.log("forget password clicked");
            fWindow.kendoWindow({
                width: 500,
                title: "Reset Password",
                modal: true,
                visible: false,
                resizable: false,
                close: function(e) {
                    vmn.hideImg = true;
                }

            });

            fDialog = fWindow.data("kendoWindow");

            var lContent = '<div class="row form-group" class="col-xs-12">';
            lContent += '    <div class="col-xs-1">Email</div>';
            lContent += '    <div class="col-xs-9"><input name="email"  ng-model="vmn.email" type="text" style="width:100%"  class="field_value form-control k-textbox" ></div>';
            lContent += '   </div> '; //row

            lContent += ' <div class="row">';
            lContent += '      <div class="col-sm-3"> </div>';
            lContent += '      <div class="col-sm-5">';
            lContent += '          <button type="button" class="btn btn-primary " ng-click="vmn.sendForgetPassword(e)" >';
            lContent += '           Reset</button>';
            lContent += '          <button type="button" class="btn btn-default " ng-click="vmn.forgetPasswordCancel(e)" >Cancel</button>';
            lContent += '      </div>';
            lContent += '  </div>';

            fDialog.content(lContent);

            var temp = $compile(fWindow.contents())($scope);
            fDialog.center();
            fDialog.open().element.closest(".k-window").css({
                top: 55,
                left: 450
            });;
        };

        this.sendForgetPassword = function(e) {
            console.log('Reset password');
            var email = vmn.email;
            console.log(email);
            firebase.auth().sendPasswordResetEmail(email).then(function(res) {
                console.log('password successfully reset');
                fDialog.close();
                setTimeout(function() {
                    alert('Email has been sent to reset password');
                }, 500);
            }).catch(function(err) {
                alert(err.toString());
            });
        };

        this.forgetPasswordCancel = function(e) {
            //firebase.auth().signOut();
            fDialog.close();
        };

        // End reset password
        var windowDiv = $('#myUploadWindow');
        var dialog = null;
        this.btnUploadHandler = function(e) {
            windowDiv.kendoWindow({
                width: 580,
                //height: 450,
                title: "Selected Element",
                modal: true,
                visible: false,
                resizable: false,
                close: function(e) {
                    // close animation has finished playing
                    vmn.hideImg = true;
                }
            });
            var uploadContent = '<div class="row form-group" style="padding: 10px 0 0 9px;">';
            uploadContent += '<div class="col-xs-12">';
            uploadContent += uploadHeader;
            uploadContent += youtubeTemp;
            uploadContent += urlTemp;
            uploadContent += videoTemp;

            uploadContent += '          </div>'; //tab-content
            uploadContent += '       </div>'; // container
            uploadContent += '    </div>';
            uploadContent += '  </div>';
            uploadContent += uploadButtons;


            dialog = windowDiv.data("kendoWindow");
            dialog.content(uploadContent);

            var temp = $compile(windowDiv.contents())($scope);
            dialog.title('Selected ');
            dialog.center();
            dialog.open().element.closest(".k-window").css({
                top: 55,
                left: 450
            });;
        }; // scope.btnUploader

        this.resetForm = function(e) {
            console.log('clicked')
            $log.log("resetForm");
            dialog.close();
        };

        $scope.onSelect = function(e) {
            var file = $.map(e.files, function(file) { return file.name; }).join(", ");
            $log.log("file name is", file);
            vmn.files.push(file);
            console.log("event :: select (" + vmn.files + ")");
        };

        this.submitForm = function(e) {
            var sourceType = $("ul.nav-tabs li.active").data('id');
            var data = {};
            if (sourceType == 'youtube') {
                data = {
                    url: vmn.url
                }

                DataService.uploadYoutubeVideo(data).then(
                    function(results) {
                        // on success
                        if ($('#grid').data('kendoGrid')) {
                            $('#grid').data('kendoGrid').dataSource.read();
                            $('#grid').data('kendoGrid').refresh();
                        }

                        dialog.close();
                    },
                    function(results) {
                        $log.error("ERROR ", results);

                    }
                );
            } else {
                // common staff
                var selectedCategories = [];
                if ($('input#action').is(':checked')) {
                    selectedCategories.push('Action');
                }
                if ($('input#comedy').is(':checked')) {
                    selectedCategories.push('Comedy');
                }
                if ($('input#cooking').is(':checked')) {
                    selectedCategories.push('Cooking');
                }
                if ($('input#crime').is(':checked')) {
                    selectedCategories.push('Crime');
                }
                if ($('input#fitness').is(':checked')) {
                    selectedCategories.push('Fitness');
                }
                if ($('input#health').is(':checked')) {
                    selectedCategories.push('Health & Wellness');
                }
                if ($('input#promoted').is(':checked')) {
                    selectedCategories.push('Promoted Shows');
                }
                if ($('input#romance').is(':checked')) {
                    selectedCategories.push('Romanace');
                }
                data['title'] = vmn.title;
                data['description'] = vmn.description;
                data['featured'] = vmn.featured;
                data['categories'] = selectedCategories;
                data['content_type'] = vmn.videoType;
                data['channel'] = vmn.channel;
                if (sourceType == 'url') {
                    data['video_path'] = vmn.video_url;
                    data['trailer'] = vmn.trailer;
                    data['thumbnail'] = vmn.thumbnail;
                    data['background_image'] = vmn.backgroundImage;
                    $log.log(data);
                    DataService.uploadUrlVideo(data).then(
                        function(results) {
                            // on success
                            if ($('#grid').data('kendoGrid')) {
                                $('#grid').data('kendoGrid').dataSource.read();
                                $('#grid').data('kendoGrid').refresh();
                            }
                            dialog.close();
                        },
                        function(results) {
                            $log.error("ERROR ", results);
                        }
                    );
                } else {
                    data['files'] = vmn.files;
                    $log.log(data);
                    DataService.uploadVideo(data).then(
                        function(results) {
                            data['files'] = [];
                            // on success
                            if ($('#grid').data('kendoGrid')) {
                                $('#grid').data('kendoGrid').dataSource.read();
                                $('#grid').data('kendoGrid').refresh();
                            }
                            dialog.close();
                        },
                        function(results) {
                            data['files'] = [];
                            $log.error("ERROR ", results);
                        }
                    );
                }
            }
        };
        var uploadHeader = '<div id="urlSector" class="container"> \
                    <ul class="nav nav-tabs"> \
                        <li class="active" data-id="youtube"> \
                            <a href="#youtube" data-toggle="tab">Youtube</a> \
                        </li> \
                        <li data-id="url"> \
                            <a href="#url" data-toggle="tab">URL</a> \
                        </li> \
                        <li data-id="video"> \
                            <a href="#video" data-toggle="tab">Video</a> \
                        </li> \
                    </ul> \
                    <div class="tab-content">';

        var uploadButtons = ' <div class="row">';
        uploadButtons += '      <div class="col-sm-3"> </div>';
        uploadButtons += '      <div class="col-sm-5">';
        uploadButtons += '          <button type="button" class="btn btn-primary " ng-click="vmn.submitForm(event)" >';
        uploadButtons += '           Submit</button>';
        uploadButtons += '          <button type="button" class="btn btn-default " ng-click="vmn.resetForm(event)" >Cancel</button>';
        uploadButtons += '      </div>';
        uploadButtons += '  </div>';

        var youtubeTemp = ' <div class="tab-pane active" id="youtube"><div>&nbsp</div>'
        youtubeTemp += '        <div class="row form-group">';
        youtubeTemp += '            <div class="col-xs-1">Youtube URL</div>';
        youtubeTemp += '            <div class="col-xs-4"><input name="url"  ng-model="vmn.url" type="text" style="width:100%"  class="field_value form-control k-textbox" ></div>';
        youtubeTemp += '        </div> '; //row
        youtubeTemp += '    </div>'

        var urlTemp = ' <div class="tab-pane" id="url"> <div>&nbsp</div>'
        urlTemp += '        <div class="row form-group">';
        urlTemp += '            <div class="col-xs-1">Title</div>';
        urlTemp += '            <div class="col-xs-4"><input name="title"  ng-model="vmn.title" type="text" style="width:100%"  class="field_value form-control k-textbox" ></div>';
        urlTemp += '        </div> '; //row
        urlTemp += '        <div class="row form-group">';
        urlTemp += '            <div class="col-xs-1">Description</div>';
        urlTemp += '            <div class="col-xs-4"><textarea name="description"  ng-model="vmn.description" rows="5" style="width:100%"  class="field_value form-control k-textbox" ></textarea></div>';
        urlTemp += '        </div> '; //row
        urlTemp += '        <div class="row form-group">';
        urlTemp += '            <div class="col-xs-1">Video</div>';
        urlTemp += '            <div class="col-xs-4"><input name="video"  ng-model="vmn.video_url" type="text" style="width:100%"  class="field_value form-control k-textbox" ></div>';
        urlTemp += '        </div> '; //row
        urlTemp += '        <div class="row form-group">';
        urlTemp += '            <div class="col-xs-1">Trailer</div>';
        urlTemp += '            <div class="col-xs-4"><input name="trailer"  ng-model="vmn.trailer" type="text" style="width:100%"  class="field_value form-control k-textbox" ></div>';
        urlTemp += '        </div> '; //row
        urlTemp += '        <div class="row form-group">';
        urlTemp += '            <div class="col-xs-1">Thumbnail Image</div>';
        urlTemp += '            <div class="col-xs-4"><input name="thumbnail"  ng-model="vmn.thumbnail" type="text" style="width:100%"  class="field_value form-control k-textbox" ></div>';
        urlTemp += '        </div> '; //row
        urlTemp += '        <div class="row form-group">';
        urlTemp += '            <div class="col-xs-1">Background Image</div>';
        urlTemp += '            <div class="col-xs-4"><input name="backgroundImage"  ng-model="vmn.backgroundImage" type="text" style="width:100%"  class="field_value form-control k-textbox" ></div>';
        urlTemp += '        </div> '; //row
        urlTemp += '        <div class="row form-group">';
        urlTemp += '            <div class="col-xs-1">Featured Video</div>';
        urlTemp += '            <div class="col-xs-4">';
        urlTemp += '                <ul class="fieldlist">';
        urlTemp += '                    <li>';
        urlTemp += '                        <input type="radio" name="featured" id="yes" class="k-radio" ng-model="vmn.featured" checked="checked" value="1">';
        urlTemp += '                        <label class="k-radio-label" for="yes">Yes</label>';
        urlTemp += '                    </li>';
        urlTemp += '                    <li>';
        urlTemp += '                        <input type="radio" name="featured" id="no" ng-model="vmn.featured" class="k-radio" value="0">';
        urlTemp += '                        <label class="k-radio-label" for="no">No</label>';
        urlTemp += '                    </li>';
        urlTemp += '                </ul>';
        urlTemp += '            </div>';
        urlTemp += '        </div> '; //end feature video

        urlTemp += '        <div class="row form-group">';
        urlTemp += '            <div class="col-xs-1">Choose Categoires</div>';
        urlTemp += '            <div class="col-xs-4">';
        urlTemp += '                 <ul class="fieldlist">';
        urlTemp += '                    <li>';
        urlTemp += '                        <input type="checkbox" id="action" name="cate[]" class="k-checkbox" value="Action">';
        urlTemp += '                        <label class="k-checkbox-label" for="action">Action</label>';
        urlTemp += '                    </li>';
        urlTemp += '                    <li>';
        urlTemp += '                        <input type="checkbox" id="comedy" name="cate[]" class="k-checkbox" value="Comedy">';
        urlTemp += '                        <label class="k-checkbox-label" for="comedy">Comedy</label>';
        urlTemp += '                    </li>';
        urlTemp += '                    <li>';
        urlTemp += '                        <input type="checkbox" id="cooking" name="cate[]" class="k-checkbox" value="Cooking">';
        urlTemp += '                        <label class="k-checkbox-label" for="cooking">Cooking</label>';
        urlTemp += '                    </li>';
        urlTemp += '                    <li>';
        urlTemp += '                        <input type="checkbox" id="crime" name="cate[]" class="k-checkbox" value="Crime">';
        urlTemp += '                        <label class="k-checkbox-label" for="crime">Crime</label>';
        urlTemp += '                    </li>';
        urlTemp += '                    <li>';
        urlTemp += '                        <input type="checkbox" id="fitness" name="cate[]" class="k-checkbox" value="Fitness">';
        urlTemp += '                        <label class="k-checkbox-label" for="fitness">Fitness</label>';
        urlTemp += '                    </li>';
        urlTemp += '                    <li>';
        urlTemp += '                        <input type="checkbox" id="health" name="cate[]" class="k-checkbox" value="Health & Wellness">';
        urlTemp += '                        <label class="k-checkbox-label" for="health">Health & Wellness</label>';
        urlTemp += '                    </li>';
        urlTemp += '                    <li>';
        urlTemp += '                        <input type="checkbox" id="promoted" name="cate[]" class="k-checkbox" value="Promoted Shows">';
        urlTemp += '                        <label class="k-checkbox-label" for="promoted">Promoted Shows</label>';
        urlTemp += '                    </li>';
        urlTemp += '                    <li>';
        urlTemp += '                         <input type="checkbox" id="romance" name="cate[]" class="k-checkbox" value="Romance">';
        urlTemp += '                        <label class="k-checkbox-label" for="romance">Romance</label>';
        urlTemp += '                    </li>';

        urlTemp += '            </div>';
        urlTemp += '        </div> '; //end categories

        urlTemp += '        <div class="row form-group">';
        urlTemp += '            <div class="col-xs-1">Video Type</div>';
        urlTemp += '            <div class="col-xs-4">';
        urlTemp += '                <select id="movieType" name="videoType" ng-model="vmn.videoType" style="width: 100%;">';
        urlTemp += '                    <option value="">Select a video type</option>';
        urlTemp += '                    <option value="Movie">Movie</option>';
        urlTemp += '                    <option value="TV Show">TV Show</option>';
        urlTemp += '                </select>';
        urlTemp += '            </div>';
        urlTemp += '        </div> '; //row

        urlTemp += '        <div class="row form-group">';
        urlTemp += '            <div class="col-xs-1">Channel</div>';
        urlTemp += '            <div class="col-xs-4">';
        urlTemp += '                <select id="movieType" name="channel" ng-model="vmn.channel" style="width: 100%;">';
        urlTemp += '                    <option value="">Select a channel</option>';
        urlTemp += '                    <option value="Zliving">Zliving</option>';
        urlTemp += '                    <option value="Zeemundo">Zeemundo</option>';
        urlTemp += '                </select>';
        urlTemp += '            </div>';
        urlTemp += '        </div> '; //row
        urlTemp += '    </div>'

        var videoTemp = ' <div class="tab-pane" id="video"> <div>&nbsp</div>'
        videoTemp += '        <div class="row form-group">';
        videoTemp += '            <div class="col-xs-1">Title</div>';
        videoTemp += '            <div class="col-xs-4"><input name="title"  ng-model="vmn.title" type="text" style="width:100%"  class="field_value form-control k-textbox" ></div>';
        videoTemp += '        </div> '; //row
        videoTemp += '        <div class="row form-group">';
        videoTemp += '            <div class="col-xs-1">Description</div>';
        videoTemp += '            <div class="col-xs-4"><textarea name="description"  ng-model="vmn.description" rows="5" style="width:100%"  class="field_value form-control k-textbox" ></textarea></div>';
        videoTemp += '        </div> '; //row
        videoTemp += '        <div class="row form-group">';
        videoTemp += '            <div class="col-xs-1">Video</div>';
        videoTemp += '            <div class="col-xs-4"><input name="content" kendo-upload k-async="{ saveUrl: \'api/saveVideo\', autoUpload: false }" k-select="onSelect" type="file" style="width:100%" ></div>';
        videoTemp += '        </div> '; //row
        videoTemp += '        <div class="row form-group">';
        videoTemp += '            <div class="col-xs-1">Trailer</div>';
        videoTemp += '            <div class="col-xs-4"><input name="trailer" kendo-upload k-async="{ saveUrl: \'api/saveTrailer\', autoUpload: false }" k-select="onSelect" type="file" style="width:100%" ></div>';
        videoTemp += '        </div> '; //row
        videoTemp += '        <div class="row form-group">';
        videoTemp += '            <div class="col-xs-1">Thumbnail Image</div>';
        videoTemp += '            <div class="col-xs-4"><input name="thumbnail" kendo-upload k-async="{ saveUrl: \'api/saveThumbnail\', autoUpload: false }" k-select="onSelect" type="file" style="width:100%" ></div>';
        videoTemp += '        </div> '; //row
        videoTemp += '        <div class="row form-group">';
        videoTemp += '            <div class="col-xs-1">Background Image</div>';
        videoTemp += '            <div class="col-xs-4"><input name="background_image" kendo-upload k-async="{ saveUrl: \'api/saveBackgroundImage\', autoUpload: false }" k-select="onSelect" type="file" style="width:100%" ></div>';
        videoTemp += '        </div> '; //row
        videoTemp += '        <div class="row form-group">';
        videoTemp += '            <div class="col-xs-1">Featured Video</div>';
        videoTemp += '            <div class="col-xs-4">';
        videoTemp += '                <ul class="fieldlist">';
        videoTemp += '                    <li>';
        videoTemp += '                        <input type="radio" name="featured" id="yes" class="k-radio" ng-model="vmn.featured" checked="checked" value="1">';
        videoTemp += '                        <label class="k-radio-label" for="yes">Yes</label>';
        videoTemp += '                    </li>';
        videoTemp += '                    <li>';
        videoTemp += '                        <input type="radio" name="featured" id="no" ng-model="vmn.featured" class="k-radio" value="0">';
        videoTemp += '                        <label class="k-radio-label" for="no">No</label>';
        videoTemp += '                    </li>';
        videoTemp += '                </ul>';
        videoTemp += '            </div>';
        videoTemp += '        </div> '; //end feature video

        videoTemp += '        <div class="row form-group">';
        videoTemp += '            <div class="col-xs-1">Choose Categoires</div>';
        videoTemp += '            <div class="col-xs-4">';
        videoTemp += '                 <ul class="fieldlist">';
        videoTemp += '                    <li>';
        videoTemp += '                        <input type="checkbox" id="actionv" name="cate[]" class="k-checkbox" value="Action">';
        videoTemp += '                        <label class="k-checkbox-label" for="actionv">Action</label>';
        videoTemp += '                    </li>';
        videoTemp += '                    <li>';
        videoTemp += '                        <input type="checkbox" id="comedyv" name="cate[]" class="k-checkbox" value="Comedy">';
        videoTemp += '                        <label class="k-checkbox-label" for="comedyv">Comedy</label>';
        videoTemp += '                    </li>';
        videoTemp += '                    <li>';
        videoTemp += '                        <input type="checkbox" id="cookingv" name="cate[]" class="k-checkbox" value="Cooking">';
        videoTemp += '                        <label class="k-checkbox-label" for="cookingv">Cooking</label>';
        videoTemp += '                    </li>';
        videoTemp += '                    <li>';
        videoTemp += '                        <input type="checkbox" id="crimev" name="cate[]" class="k-checkbox" value="Crime">';
        videoTemp += '                        <label class="k-checkbox-label" for="crimev">Crime</label>';
        videoTemp += '                    </li>';
        videoTemp += '                    <li>';
        videoTemp += '                        <input type="checkbox" id="fitnessv" name="cate[]" class="k-checkbox" value="Fitness">';
        videoTemp += '                        <label class="k-checkbox-label" for="fitnessv">Fitness</label>';
        videoTemp += '                    </li>';
        videoTemp += '                    <li>';
        videoTemp += '                        <input type="checkbox" id="healthv" name="cate[]" class="k-checkbox" value="Health & Wellness">';
        videoTemp += '                        <label class="k-checkbox-label" for="healthv">Health & Wellness</label>';
        videoTemp += '                    </li>';
        videoTemp += '                    <li>';
        videoTemp += '                        <input type="checkbox" id="promotedv" name="cate[]" class="k-checkbox" value="Promoted Shows">';
        videoTemp += '                        <label class="k-checkbox-label" for="promotedv">Promoted Shows</label>';
        videoTemp += '                    </li>';
        videoTemp += '                    <li>';
        videoTemp += '                         <input type="checkbox" id="romancev" name="cate[]" class="k-checkbox" value="Romance">';
        videoTemp += '                        <label class="k-checkbox-label" for="romancev">Romance</label>';
        videoTemp += '                    </li>';

        videoTemp += '            </div>';
        videoTemp += '        </div> '; //end categories

        videoTemp += '        <div class="row form-group">';
        videoTemp += '            <div class="col-xs-1">Video Type</div>';
        videoTemp += '            <div class="col-xs-4">';
        videoTemp += '                <select id="movieType" name="videoType" ng-model="vmn.videoType" style="width: 100%;">';
        videoTemp += '                    <option value="">Select a video type</option>';
        videoTemp += '                    <option value="Movie">Movie</option>';
        videoTemp += '                    <option value="TV Show">TV Show</option>';
        videoTemp += '                </select>';
        videoTemp += '            </div>';
        videoTemp += '        </div> '; //row

        videoTemp += '        <div class="row form-group">';
        videoTemp += '            <div class="col-xs-1">Channel</div>';
        videoTemp += '            <div class="col-xs-4">';
        videoTemp += '                <select id="movieType" name="channel" ng-model="vmn.channel" style="width: 100%;">';
        videoTemp += '                    <option value="">Select a channel</option>';
        videoTemp += '                    <option value="Zliving">Zliving</option>';
        videoTemp += '                    <option value="Zeemundo">Zeemundo</option>';
        videoTemp += '                </select>';
        videoTemp += '            </div>';
        videoTemp += '        </div> '; //row
        videoTemp += '    </div>'
    })
}())