(function() {

    var app = angular.module("myFrontend");

    var VideosController = function($rootScope, $http, $scope, $state, $log, $stateParams, $anchorScroll, $compile, DataService, allCategoriesDataSource, allContentDataSource) {
        var vm = this;
        vm.allCategoriesDataSource = allCategoriesDataSource;
        var aa = DataService.getPopularVideos();
        console.log('ssss' + aa);
        DataService.getLatestVideos();

        $log.log("allCategoriesDataSource  =", allCategoriesDataSource); //id=videoid
        // var video_url="http://69.16.231.161/rest/public/api/v1/video"

        //Initialize kendoDropDownList 
        this.categoryOptions = {
            dataSource: allCategoriesDataSource.data,
            dataTextField: "name",
            dataValueField: "id",
            optionLabel: "Select...",
            change: function(e) {
                var value = this.value();
                $log.info("value", value);
                var text = this.text();
                $log.info("text", text);
                if (value) {
                    $("#grid").data("kendoGrid").dataSource.filter({
                        logic: "or",
                        filters: [{
                                field: "genre",
                                operator: "contains",
                                value: text
                            },

                        ]
                    });
                } else {
                    //reset filter
                    $("#grid").data("kendoGrid").dataSource.filter({});
                }

            }
        };

        //filter using Search Bar
        this.txtSearchChange = function() {

            var val = String(vm.txtSearch);
            $log.log("txtSearchChange ", val, typeof vm.txtSearch);
            $("#grid").data("kendoGrid").dataSource.filter({
                logic: "or",
                filters: [{
                        field: "title",
                        operator: "contains",
                        value: val
                    },

                    {
                        field: "short_description",
                        operator: "contains",
                        value: val
                    },
                    /*  {
                            field : "ads_id",
                            operator: "contains",
                            value : val
                        },*/

                ]
            });
        }

        var video_url = "/videoant/api/getAllContents";

        vm.grid = $("#grid").kendoGrid({
            //dataSource: videos,
            dataSource: {
                type: "json",
                transport: {
                    read: video_url
                },
                pageSize: 20,
                schema: {
                    data: "data",
                    total: "total",
                },
            },
            height: 600,
            selectable: "row",
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 3
            },
            change: function(e) {
                var row = this.select();
                var selectedRow = e.sender.dataItem(row);
                // console.log("selected Row=", selectedRow);
                $log.log("videplayer id=", selectedRow.id); //id=videoid
                $state.go('videoplayer', { videoId: selectedRow.id, video: selectedRow });

            },
            columns: [{
                    field: "thumbnail",
                    title: "Thumbnail",
                    width: "120px",
                    height: "160px",
                    template: $("#link-template").html()
                        //template: "<a href='\\#/videoplayer' ><img src='#:data.poster#', height='100', width='80'/></a>"
                },
                {
                    field: "title",
                    title: "Title",
                    width: "150px"
                },
                {
                    field: "short_description",
                    title: "Description",
                    template: "#:data.short_description#", //"#:getTheSubstring(data.description,100)#"
                }
            ]
        }).data("kendoGrid");
    }

    app.controller("VideosController", VideosController);

}());