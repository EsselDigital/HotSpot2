(function() {

    var app = angular.module("myFrontend");

    var VideoPlayerController = function($rootScope, $http, $scope, $timeout, $location, $log, $stateParams, $anchorScroll, DataService, $compile,
        allElementsContents) {
        var vm = this;
        var elementId = null;
        vm.hideImg = true;
        vm.selectedItem = null;
        vm.element_contents = null;

        var scentURL = 'http://69.16.231.161/videos/Food_Fight.mp4';
        //DataService.getVideoURL(vid)

        var cache = DataService.myCache;
        var cachedTime = cache.get('cachedTime')
        var currentTime = new Date().getTime();
        if (cachedTime) {
            var diff = (currentTime - cachedTime) / 1000;
            //console.log(diff);
            if (diff > 10800) {
                cache.remove('element_contents');
            }
        }
        //DataService.getPopularVideos();
        cache.put('cachedTime', currentTime);

        // redirect to homepage

        if (!$scope.uid) {
            $location.url("/videoant/");
            //console.log('uid', $scope.uid);
        } else {

            var vid = $stateParams.videoId;
            var video = $stateParams.video;
            var content_type = "";
            var vurl = "";
            $log.info("vid ", vid);
            $log.info("video= ", video);

            if (video !== null) {
                $log.info(" -----> video= ", video.category);
                vurl = video.videoUrl; //scentURL //video.video_path;
                content_type = video.content_type ? 'Youtube' : 'food';
                video.content_type;
                vm.title = video.title;
                $log.info(" init1 vurl= ", vurl);
                /*DataService.getVideoURL(video.smil_file_path).then(function(res) {
                    vurl = res;
                    startPlayback();
                });*/
                startPlayback();

            } else {

                $log.log(" -----------> DataService.getVideo called");
                DataService.getContent(vid).then(
                    function(res) {
                        // on success
                        console.log('res', res.videoUrl);
                        video = res;

                        vurl = res.videoUrl; //scentURL // video.video_path;
                        content_type = res.content_type ? 'Youtube' : 'food'; //video.content_type;
                        vm.title = video.title;
                        /*DataService.getVideoURL(video.smil_file_path).then(function(res) {
                            vurl = res;
                            startPlayback();
                        });*/
                        startPlayback();
                    },
                    function(err) {
                        $log.error("ERROR ", err);


                    }
                );
            }
            $log.info(" init vurl= ", vurl);

            this.convertToHHMMSS = function(whereYouAt) {
                var date = new Date(null);
                date.setSeconds(whereYouAt); // specify value for SECONDS here
                var result = date.toISOString().substr(11, 8);

                return result.toString('H:mm:ss');
            }

            function startPlayback() {


                if (videojs.getPlayers()["my-video"] && $stateParams.video) {
                    $log.info("delete player");
                    delete videojs.getPlayers()["my-video"];

                    /*          var player = videojs('my-video');
                              player.dispose();
                              */
                } else {
                    $log.info("dont delete player");
                }


                window.player = videojs("my-video", {
                    techOrder: ["html5", "youtube", "flash"]
                }, function() {
                    videojs_player = this;
                    var cType = 'video/mp4'; //'application/x-mpegURL'; //video/mp4'
                    $log.log(";;;;;;;;;;;;;; ", content_type);
                    if (content_type == 'Youtube') {
                        cType = 'video/youtube';
                        vurl = "https://www.youtube.com/watch?v=" + vurl;
                        $log.info("player vurl= ", vurl);
                    }

                    videojs_player.src({
                        src: vurl,
                        type: cType
                    })
                    var myTextArea = document.getElementById('time_count');

                    videojs_player.on("timeupdate", function() {
                        //console.log(videojs_player.duration());
                        var whereYouAt = videojs_player.currentTime();
                        var formattedTime = vm.convertToHHMMSS(whereYouAt);


                        myTextArea.innerHTML = formattedTime;

                    });
                    videojs_player.off('click');
                    videojs_player.on("click", function(event) {
                        event.preventDefault();
                        var ele = '<input id="vr" class="btn btn-info btn-block" value="VR" onclick="save(\'vr\')"/>' +
                            '<input id="ar" class="btn btn-info btn-block" value="AR" onclick="save(\'ar\')"/>' +
                            '<input id="smell" class="btn btn-info btn-block" value="Smell" onclick="save(\'smell\')"/>' +
                            '<input id="touch3d" class="btn btn-info btn-block" value="Touch 3D" onclick="save(\'touch3d\')"/>' +
                            '<input id="print3d" class="btn btn-info btn-block" value="Print 3D" onclick="save(\'print3d\')"/>';
                        if (content_type == 'Youtube') {
                            if (videojs_player.paused()) {
                                //  hideAll();
                            } else {
                                console.log("click", videojs_player.currentTime());
                                currTime = videojs_player.currentTime();
                                // document.getElementById('insert_add').innerHTML = ele;
                            }
                        } else {
                            if (videojs_player.paused()) {
                                //console.log("click", videojs_player.currentTime());
                                currTime = videojs_player.currentTime();
                                //  document.getElementById('insert_add').innerHTML = ele;
                            } else {
                                // hideAll();
                                //document.getElementById('insert_add').innerHTML = "";
                            }
                        }

                    });

                    videojs_player.play();
                });

                DataService.getVideoAnnotationsFB($scope.uid, vid).then(function(res) {
                    var grid = $("#grid").kendoGrid({

                        dataSource: {
                            data: res.data,
                            pageSize: 6,
                            total: res.total
                        },
                        height: 600,
                        selectable: true,
                        sortable: true,
                        pageable: {
                            refresh: true,
                            pageSizes: true,
                            buttonCount: 3
                        },

                        columns: [{
                                field: "Select",
                                title: " ",
                                width: "20px",
                                template: "<input type='checkbox' class='sel' value='#:data.id#'/>",

                            }, {
                                field: 'image',
                                title: ' ',
                                width: "100px",
                                template: "<div><img  src='#:data.thumbnail#' width='70px' height='40p'/></div>",

                            }, {
                                field: 'elementname',
                                width: "40px",
                                title: 'Element',

                            }, {
                                field: 'element_title',
                                width: "20%",
                                title: 'Element content',

                            },
                            {
                                field: 'current_time',
                                width: "60px",
                                title: 'Time',

                            },
                            /*   {   
                                   width: "50px",
                                   title: 'Action',
                                   template:"<button class='btn btn-danger' ng-click='vm.onDeleteButtonClicked(#:data.id#)'> Delete </button>"

                               }*/
                            {
                                command: {
                                    text: "Delete",
                                    className: "btn btn-art-danger",
                                    click: onDeleteButtonClicked

                                },
                                title: "Action",
                                width: "50px",


                            }
                        ],
                        change: function(e) {

                            var row = this.select();
                            var selectedRow = e.sender.dataItem(row);
                            //console.log("selected Row=", selectedRow);
                            $log.log("videplayer id=", selectedRow.id); //id=videoid





                        },
                    }).data("kendoGrid");
                });
            }

            function onDeleteButtonClicked(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $log.log("onDeleteButtonClicked", vid, dataItem);
                DataService.deleteVideoAnnotationFirebase($scope.uid, vid, dataItem).then(function(res) {
                    console.log('delete: ', res);
                    $('#grid').data('kendoGrid').dataSource.remove(dataItem);
                    $('#grid').data('kendoGrid').refresh();
                });
                /*DataService.deleteAnnotation(dataItem.id).then(
                    function(results) {
                        // on success

                        $log.log("deleteAnnotation success", results);
                        DataService.deleteVideoAnnotationFirebase($scope.uid, results);
                        refreshGrid();
                        //

                        notification.show({
                            title: "Deleted a hotspot ",
                            message: "Removed a hotspot "
                        }, "delete");

                    },
                    function(results) {
                        // on error

                        $log.error("ERROR ", results);


                    }
                );*/
            }


            var windowDiv = $('#myDialogWindow');
            var dialog = null;

            function openDialog(element) {
                dialog = windowDiv.kendoWindow({
                    width: 550,
                    //height: 200,
                    title: "Select " + element,
                    modal: true,
                    visible: false,
                    resizable: false,
                    close: function(e) {
                        // close animation has finished playing
                        vm.hideImg = true;
                    },
                    open: function() {
                        console.log('initializzing.....')
                        kendo.init(windowDiv);
                    }
                }).data("kendoWindow");

                //dialog = windowDiv.data("kendoWindow");

                var whereYouAt = videojs_player.currentTime();
                var date = new Date(null);
                date.setSeconds(whereYouAt); // specify value for SECONDS here
                var result = date.toISOString().substr(11, 8);
                result.toString('H:mm:ss');

                var dataSourceElement;

                $log.log("insertAnnotation data", allElementsContents[element]);
                var dataSource = [];
                var keys = Object.keys(allElementsContents[element]);
                for (var x = 0; x < keys.length; x++) {
                    dataSource.push(allElementsContents[element][keys[x]]);
                }
                $log.log(" ---------   dataSourceElement =", dataSource);

                var familyData = [];
                vm.smellElementSource = [];
                var family = [];
                if (element == 'Smell') {
                    for (var i = 0; i < dataSource.length; i++) {
                        var k = dataSource[i]['family'];
                        var v = dataSource[i];
                        var keyObj = { "family": k };
                        //console.log(k);
                        if (k && family.indexOf(k) === -1) {
                            //console.log('fddfs');
                            familyData.push(keyObj);
                            family.push(k);
                        } else {
                            //console.log('family already exists ', k);
                        }
                        vm.smellElementSource = vm.smellElementSource.concat(v);
                    }
                } else {
                    //dataSourceElement = dataSource;
                    vm.smellElementSource = dataSource;
                }
                //console.log('familyData ', familyData);
                vm.familyDataSource = familyData;

                $log.log(vm.smellElementSource);

                //end 


                var content = '<div class="row form-group" style="padding: 10px 0 0 9px;">';
                content += '  <div class="col-xs-12">';

                if (element == "Smell") {
                    content += '    <div class="row form-group">';
                    content += '      <div class="col-xs-1">Select</div>';
                    content += '      <div class="col-xs-9"><div  style="width:100%" id="select_family"></div></div>';
                    content += '    </div> ';
                }

                content += '    <div class="row form-group">';
                content += '      <div class="col-xs-1">Select</div>';
                content += '      <div class="col-xs-9"><div  style="width:100%" id="select_element"></div></div>';
                content += '    </div> '; //row
                if (element == "Smell" | element == "Touch 3D") {

                    content += '    <div class="row form-group">';
                    content += '     <div class="col-xs-1">Duration</div>';
                    content += '     <div class="col-xs-9"><input id="duration" name="duration"  ng-model="vm.duration" type="number" title="numeric" value="5" min="1" max="100" step="1" style="width:100%"  class="field_value form-control k-textbox" ></div>';
                    content += '    </div> '; //row
                }
                content += '  </div>'; //xs8
                content += '  <div class="col-xs-2">';
                content += '      <div class="col-xs-12" ng-hide="vm.hideImg"><div class="thumbnail" ><img id="thumbnail"  /></div></div>';
                content += '  </div>'; //xs3
                content += '</div>'; //row
                content += '<div class="row form-group" style="padding: 10px 0 0 9px;">'; //row

                content += ' <div class="row">';
                content += '    <div class="col-sm-3"> </div>';
                content += '    <div class="col-sm-5">';
                content += '      <button type="button" class="btn btn-primary " ng-disabled="vm.submitButtonDisabled" ng-click="vm.submitForm(event)" >';
                content += '           Submit</button>';
                content += '      <button type="button" class="btn btn-default " ng-click="vm.resetForm(event)" >Cancel</button>';
                content += '    </div>';
                content += ' </div>';



                //add html contents to window dialog
                dialog.content(content);
                //process injected angular codes	
                var temp = $compile(windowDiv.contents())($scope);
                dialog.title("Select " + element + ' @ ' + result);
                dialog.center();

                var sf = $("#select_family").kendoDropDownList({
                    dataSource: vm.familyDataSource,

                    dataTextField: "family",
                    dataValueField: "family",
                    height: 400
                });
                var template = '<span class="k-state-default" style="background-image: url(\'#:data.thumbnail#\')"></span>' +
                    '<span class="k-state-default"><label>#:data.name#</label></span>';
                if (element == 'Touch 3D') {
                    template = '<span class="k-state-default" style="background-image: url(\'#:data.thumbnail#\'); width:70px; height:70px; -webkit-box-shadow:none"></span>' +
                        '<span class="k-state-default"><label>#:data.name#</label></span>';
                }
                var ddl = $("#select_element").kendoDropDownList({
                    dataSource: vm.smellElementSource,
                    cascadeFrom: "select_family",
                    dataTextField: "photo",
                    dataValueField: "title",
                    optionLabel: "Select...",
                    headerTemplate: '<div class="dropdown-header k-widget k-header">' +
                        '<span>Photo</span>' +
                        '<span>Title</span>' +
                        '</div>',
                    valueTemplate: '<span class="selected-value" style="background-image: url(\'#:data.thumbnail#\')"></span><span>#:data.name#</span>',
                    template: template,
                    height: 400,
                    change: function(e) {

                        var dataItem = this.dataItem(e.item);
                        vm.selectedItem = dataItem;
                        $log.log("select_element :: change ( thumbnail " + dataItem.thumbnail + " : title " + dataItem.name + ")");
                        $("#thumbnail").attr("src", dataItem.thumbnail);
                        vm.hideImg = false;
                        $scope.$digest();
                    }
                });

                dialog.open();
            }



            function refreshGrid() {
                var grid = $("#grid").data("kendoGrid");
                grid.dataSource.read();
                grid.refresh();
            }

            this.submitForm = function(e) {
                $log.log("submitForm duration=", vm.duration, " item=", vm.selectedItem);
                var data = {
                    "current_time": videojs_player.currentTime(),
                    "code": vm.selectedItem.code ? vm.selectedItem.code : null,
                    "elementname": vm.selectedItem.element_type,
                    "element_title": vm.selectedItem.name,
                    "family": vm.selectedItem.family ? vm.selectedItem.family : null,
                    "thumbnail": vm.selectedItem.thumbnail,
                    "content_url": vm.selectedItem.video_url ? vm.selectedItem.video_url : null,
                    "duration": vm.duration ? vm.duration : null
                }
                DataService.insertVideoAnnotationFirebase($scope.uid, vm.selectedItem.element_type, vid, data).then(function(res) {
                    $('#grid').data('kendoGrid').dataSource.add(res);
                    $('#grid').data('kendoGrid').refresh();
                    var t = vm.convertToHHMMSS(videojs_player.currentTime());
                    notification.show({
                        title: "New hotspot ",
                        message: "Added a new " + vm.selectedItem.element_type + " at " + t
                    }, "add");

                }).catch(function(err) {
                    notification.show({
                        title: "New hotspot ",
                        message: "Added a new " + vm.selectedItem.element_type + " at " + t
                    }, "error");
                });

                dialog.close();
            }
            this.resetForm = function(e) {
                $log.log("resetForm", e);
                dialog.close();
            }

            vm.showDialog = function(element) {
                $log.log("element =", element);
                videojs_player.pause();
                openDialog(element);
            }




            var notification = $("#notification").kendoNotification({
                position: {
                    pinned: true,
                    top: 30,
                    right: 30
                },
                autoHideAfter: 2000,
                stacking: "down",
                templates: [{
                    type: "delete",
                    template: $("#deleteTemplate").html()
                }, {
                    type: "error",
                    template: $("#errorTemplate").html()
                }, {
                    type: "add",
                    template: $("#addTemplate").html()
                }]

            }).data("kendoNotification");

        } // else
    }

    app.controller("VideoPlayerController", VideoPlayerController);

}());
