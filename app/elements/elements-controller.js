(function() {

    var app = angular.module("myFrontend");
    var ElementsController = function($rootScope, $http, $scope, $location, $log, $stateParams, $anchorScroll, DataService, $compile,
        allElementsContents) {
        // redirect to homepage
        if (!$scope.uid) {
            $location.url("/videoant/");
        }
        //DataService.loadElementContentToFB();
        var vm = this;
        //vm.element_contents = null;
        var contentGrid = null;
        this.showButton = false;
        this.element_type = null;
        this.files = [];

        var cache = DataService.myCache;
        var cachedTime = cache.get('cachedTime')
        var currentTime = new Date().getTime();
        if (cachedTime) {
            var diff = (currentTime - cachedTime) / 1000;
            console.log(diff);
            if (diff > 10800) {
                cache.remove('element_contents');
            }
        }
        cache.put('cachedTime', currentTime);

        vm.showContent = function(element_type) {
            this.element_type = element_type;
            $log.log("element type", element_type);
            this.showButton = true;
            // = cache.get('element_contents');
            if (allElementsContents) {
                console.log('cached', allElementsContents);
            }
            var keys = Object.keys(allElementsContents[element_type]);
            var data = [];
            for (var x = 0; x < keys.length; x++) {
                data.push(allElementsContents[element_type][keys[x]]);
            }
            console.log(data);
            if (element_type == 'Smell' | element_type == 'Touch 3D' | element_type == 'Print 3D') {
                contentGrid = $("#contentGrid").kendoGrid({

                    dataSource: {
                        data: data,
                        total: x,
                        pageSize: 20
                    },
                    //     toolbar: '',
                    height: 375,
                    selectable: "multiple cell",
                    pageable: true,
                    dataBound: function(e) {
                        $log.log("databound success");

                    },
                    columns: [{
                        template: "<img src=#:data.thumbnail# width='120px'>" +
                            "<div class='customer-name'>#: name #</div>",
                        field: "name",
                        title: element_type,
                        width: 240,
                        headerAttributes: {
                            style: "display: none"
                        }
                    }, {
                        command: {
                            text: "Delete",
                            className: "btn btn-art-danger",
                            click: deleteElementContent
                        },
                        title: "Action",
                        width: "55px",
                        headerAttributes: {
                            style: "display: none"
                        }
                    }]

                }).data("kendoGrid");
            } else {
                contentGrid = $("#contentGrid").kendoGrid({
                    dataSource: {
                        data: data,
                        total: x,
                        pageSize: 20
                    },

                    height: 375,
                    selectable: "multiple cell",
                    pageable: true,
                    columns: [{
                            template: "<img src=#:data.thumbnail# width='120px'>" +
                                "<div class='customer-name'>#: name #</div>",
                            field: "name",
                            title: "\'" + element_type + "\'",
                            width: "120px",
                            headerAttributes: {
                                style: "display: none"
                            }
                        },
                        {
                            field: "video_url",
                            title: "Content",
                            width: "240px",
                            headerAttributes: {
                                style: "display: none"
                            }
                        },
                        {
                            field: "video_duration",
                            title: "Duration",
                            width: "55px",
                            headerAttributes: {
                                style: "display: none"
                            }
                        },
                        {
                            command: {
                                text: "Delete",
                                className: "btn btn-danger",
                                click: deleteElementContent
                            },
                            title: "Action",
                            width: "55px",
                            headerAttributes: {
                                style: "display: none"
                            }
                        }
                    ]

                }).data("kendoGrid");
            }



        };
        var windowDiv = $('#myDialogWindow');
        var dialog = null;
        vm.btnClickHandler = function(e) {

            $log.log("btnClickHandler");
            windowDiv.kendoWindow({
                width: 500,
                height: 550,
                title: "Selected Element " + this.element_type,
                modal: true,
                visible: false,
                resizable: false,
                close: function(e) {
                    // close animation has finished playing
                    vm.hideImg = true;
                }
            });

            dialog = windowDiv.data("kendoWindow");


            var content = '<div class="row form-group" style="padding: 10px 0 0 9px;">';
            content += '  <div class="col-xs-12">';

            // Name
            content += '    <div class="row form-group">';
            content += '     <div class="col-xs-1">Name</div>';
            content += '     <div class="col-xs-9"><input id="name" name="name"  ng-model="vm.name" type="text" style="width:100%"  class="field_value form-control k-textbox" ></div>';
            content += '    </div> '; //row

            // Thumbnail
            content += '    <div class="row form-group">';
            content += '     <div class="col-xs-1">Thumbnail</div>';
            content += '     <div class="col-xs-9"><input id="image" name="image"  kendo-upload k-async="{ saveUrl: \'api/saveElementImage\', autoUpload: false }" k-select="onSelect" type="file" style="width:100%" ></div>';
            content += '    </div> '; //row

            // Content and duration for VR and AR
            if (this.element_type == 'VR' | this.element_type == 'AR') {
                content += '    <div class="row form-group">';
                content += '     <div class="col-xs-1">Content</div>';
                content += '     <div class="col-xs-9"><input id="video" name="content"  kendo-upload k-async="{ saveUrl: \'api/saveElementContent\', autoUpload: false }" k-select="onSelect" type="file" style="width:100%" ></div>';
                content += '    </div> '; //row

                content += '    <div class="row form-group">';
                content += '     <div class="col-xs-1">Duration</div>';
                content += '     <div class="col-xs-9"><input id="duration" name="duration"  ng-model="vm.duration" style="width:100%"  class="field_value form-control k-textbox" ></div>';
                content += '    </div> '; //row
            }

            content += '  </div>'; //xs12

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
            dialog.title(this.element_type + ' Selected ');
            dialog.center();
            dialog.open();
        }

        $scope.onSelect = function(e) {
            var file = $.map(e.files, function(file) { return file.name; }).join(", ");
            $log.log("file name is", file);
            vm.files.push(file);
            console.log("event :: select (" + vm.files + ")");
        }

        this.submitForm = function(e) {
            var data = {
                element_type: vm.element_type,
                name: vm.name,
                files: vm.files,
                duration: vm.duration
            };
            $log.log(data);
            //DataService.insertElementContent(data).then(
            DataService.insertElementContentFB(data).then(
                function(results) {
                    cache.remove('element_contents');
                    // on success
                    dialog.close();
                    vm.files = [];

                    $('#contentGrid').data('kendoGrid').dataSource.add(results.data);
                    $('#contentGrid').data('kendoGrid').refresh();
                    $log.log("insert element content ", results);
                },
                function(results) {
                    // on error
                    vm.files = [];
                    $log.error("ERROR ", results);

                }
            );
        }
        this.resetForm = function(e) {
            vm.files = [];
            $log.log("resetForm", e);
            dialog.close();
        }

        function deleteElementContent(e) {
            e.preventDefault();
            var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
            //var id = dataItem.id;
            console.log('dataItem', dataItem);
            var key = md5(dataItem.element_type + dataItem.name);
            var element_type = dataItem.element_type;
            console.log(key);

            // Delete element contents
            //DataService.deleteElementContentFB(id).then(
            DataService.deleteElementContentFB(key, element_type).then(
                function(results) {
                    // on success
                    cache.remove('element_contents');
                    $log.log("Delete element content data", results);
                    $('#contentGrid').data('kendoGrid').dataSource.remove(dataItem);
                    $('#contentGrid').data('kendoGrid').refresh();

                },
                function(results) {
                    // on error
                    $log.error("ERROR ", results, $scope.uid, key);
                }
            );
        }

    }

    app.controller("ElementsController", ElementsController);

}());