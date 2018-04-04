(function() {

    var app = angular.module("myFrontend");

    var VideosController = function($rootScope, $http, $scope, $location, $cacheFactory, $state, $log, $stateParams, $anchorScroll, $compile, DataService,
        allCategoriesDataSource, allContentDataSource) {
        var vm = this;
        //var popularVideos = DataService.getPopularVideos();
        //var latestVideos = DataService.getLatestVideos();
        var cache = DataService.myCache;
        var cachedTime = cache.get('cachedTime')
        var currentTime = new Date().getTime();
        /*DataService.getVideoURL('aaaa').then(function(res) {
                console.log(res);
            })*/
        //DataService.loadCategoriesToFB();
        if (cachedTime) {
            var diff = (currentTime - cachedTime) / 1000;
            console.log(diff);
            if (diff > 10800) {
                cache.remove('videos');
            }
        }
        cache.put('cachedTime', currentTime);

        // redirect to homepage
        if (!$scope.uid) {
            $location.url("/videoant/");
        } else {
            //console.log('latest videos', latestVideos);
            vm.allCategoriesDataSource = allCategoriesDataSource;
            vm.allContentDataSource = allContentDataSource;

            $log.log("allCategoriesDataSource  =", allCategoriesDataSource.data); //id=videoid

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
                                    field: "genres",
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

            strFromat = function(str) {
		if (str) {
                    return str.substr(0, 250);
                }
                return str;
            }

            //var video_url = "/videoant/api/getAllContents";
            //console.log('allContentDataSource1', vm.allContentDataSource.data)

            vm.grid = $("#grid").kendoGrid({
                //dataSource: videos,
                /*dataSource: {
                    type: "json",
                    transport: {
                        read: video_url
                    },
                    pageSize: 20,
                    schema: {
                        data: "data",
                        total: "total",
                    },
                },*/
                dataSource: {
                    //data: latestVideos, //vm.allContentDataSource.data,
                    data: vm.allContentDataSource.data,
                    pageSize: 20,
                    total: vm.allContentDataSource.data.length //vm.allContentDataSource.total
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
                        field: "bg_sm_url", //backdrop_path",
                        title: "Thumbnail",
                        width: 250,
                        height: 140,
                        template: $("#link-template").html()
                            //template: "<a href='\\#/videoplayer' ><img src='#:data.poster#', height='100', width='80'/></a>"
                    },
                    {
                        field: "title",
                        title: "Title",
                        width: 250
                    },
                    {
                        field: "overview",
                        title: "Description",
                        minResizableWidth: 100,
                        template: "#=strFromat(data.overview)#", //"#:getTheSubstring(data.description,100)#"
                    }
                ]
            }).data("kendoGrid");
        } //else
    }
    app.controller("VideosController", VideosController);

}());
