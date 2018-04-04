(function() {
    var app = angular.module("myFrontend");

    var AdminController = function(isAdmin,allGamesDataSource,allViewersDataSource,allUsersDataSource,$rootScope,$http,$scope,$log,$stateParams,toastr,$window,DataService,$location) {
        var admin = this;
        this.allUsersDataSource=allUsersDataSource.data;
        this.allViewersDataSource=allViewersDataSource.data;
        this.allGamesDataSource=allGamesDataSource.data;


        this.showSideBar=true;

        $log.log("allUsersDataSource=",this.allUsersDataSource);

        this.allUsersGridOptions = {
            dataSource: this.allUsersDataSource.data,
            selectable: "row",
            sortable: true,
            pageable: {
                    refresh: true,
                    buttonCount: 4,
                    input: false,
                    numeric: true,
                    pageSize: 10,
                    pageSizes: [5,10, 20, 50]
            },
            /*
            toolbar: [
              { name: "Add New User" },
            ],*/
            columns: [
                 {field: "id", title: "ID",width:"50px"},
                 {field: "username", title: "User Name", width: "15%"},
                 {field: "firstname", title: "First Name", width: "15%"},
                 {field: "lastname", title: "Last Name", width: "15%"},
                 {field: "email", title: "Email", width: "20%"},
                 {field: "active", title: "Status", width: "20%",

                 template: "<div style='"+"#:(data.active=='0')?'color:red':'color:black'#"+"'>#:(data.active=='0')?'Inactive':'Active'#</div>",
               },
                { command: "edit", title: "Action", width: 120 }
            ],
            save: function(e) {
              //If this was an invalid selection, cancel any changes before they get auto-synced back to the server
              if (e.values.vendor && isNaN(e.values.vendor)) {
                e.sender.cancelRow();
              }
            },
            dataBound: function(e) {
            }       
          };

          this.allViewersGridOptions = {
            dataSource: this.allViewersDataSource.data,
            selectable: "row",
            sortable: true,
            pageable: {
                    refresh: true,
                    buttonCount: 4,
                    input: false,
                    numeric: true,
                    pageSize: 10,
                    pageSizes: [5,10, 20, 50]
            },
            /*
            toolbar: [
              { name: "Add New User" },
            ],*/
            columns: [
                 {field: "id", title: "ID",width:"50px"},
                 {field: "username", title: "User Name", width: "20%"},
                 {field: "firstname", title: "First Name", width: "20%"},
                 {field: "lastname", title: "Last Name", width: "20%"},
                 {field: "email", title: "Email", width: "20%"},
                 {field: "active", title: "Status", width: "10%",
                  template: "<div style='"+"#:(data.active=='0')?'color:red':'color:black'#"+"'>#:(data.active=='0')?'Inactive':'Active'#</div>",
                  },

                { command: "edit", title: "Action", width: 120 }
                  ],
            save: function(e) {
              //If this was an invalid selection, cancel any changes before they get auto-synced back to the server
              if (e.values.vendor && isNaN(e.values.vendor)) {
                e.sender.cancelRow();
              }
            },
            dataBound: function(e) {
            }       
          };


        this.allGamesGridOptions = {
            dataSource: this.allGamesDataSource.data,
            selectable: "row",
            sortable: true,
            pageable: {
                    refresh: true,
                    buttonCount: 4,
                    input: false,
                    numeric: true,
                    pageSize: 10,
                    pageSizes: [5,10, 20, 50]
            },
            /*
            toolbar: [
              { name: "Add New User" },
            ],*/
            columns: [
                 {field: "id", title: "ID",width:"30px"},
                 {  field: "thumbnail_path", 
                    template: "<div class='photo'" +
                                    "style='width:40px;height:40px;background-size: contain;background-image: url(#:data.thumbnail_path#);'></div>",
                    title: "Thumbnail", width: "50px"},
                 {field: "title", title: "Title", width: "15%"},
                 {field: "description", title: "Description", width: "15%"},
                 {field: "icon_path", 
                  template: "<div class='photo'" +
                                    "style='width:40px;height:40px;background-size: contain;background-image: url(#:data.icon_path#);'></div>" ,
                 title: "Icon", width: "50px",hidden:true},
                 {field: "active", title: "Status", width: "30px",
                   template: "<div style='"+"#:(data.active=='0')?'color:red':'color:black'#"+"'>#:(data.active=='0')?'Inactive':'Active'#</div>",
                },
                { command: "edit", title: "Action", width: 120 }
            ],
            save: function(e) {
              //If this was an invalid selection, cancel any changes before they get auto-synced back to the server
              if (e.values.vendor && isNaN(e.values.vendor)) {
                e.sender.cancelRow();
              }
            },
            dataBound: function(e) {
            }       
          };

          this.menuSelected =function(selection){
            $log.log('menuSelected =',selection);
            $(".tableGrid").hide();
            $("#"+selection).show();


          }


          //filter using Search Bar
        this.userTxtSearchChange=function(){
           
            var val=String(admin.userTxtSearch);
          //   //$log.log("txtSearchChange ",val,typeof $scope.txtSearch);
            $("#usersTable").data("kendoGrid").dataSource.filter({
                    logic: "or",
                    filters: [
                        {
                            field : "username",
                            operator: "contains",
                            value : val
                        },
                          {
                            field : "firstname",
                            operator: "contains",
                            value : val
                        },
                         {
                            field : "lastname",
                            operator: "contains",
                            value : val
                        },
                            {
                            field : "email",
                            operator: "contains",
                            value : val
                        },
                      
                    ]
                });
        }
      
      this.viewerTxtSearchChange=function(){
           
            var val=String(admin.viewerTxtSearch);
          //   //$log.log("txtSearchChange ",val,typeof $scope.txtSearch);
            $("#viewersTable").data("kendoGrid").dataSource.filter({
                    logic: "or",
                    filters: [
                        {
                            field : "username",
                            operator: "contains",
                            value : val
                        },
                          {
                            field : "firstname",
                            operator: "contains",
                            value : val
                        },
                         {
                            field : "lastname",
                            operator: "contains",
                            value : val
                        },
                            {
                            field : "email",
                            operator: "contains",
                            value : val
                        },
                      
                    ]
                });
        }

        this.gameTxtSearchChange=function(){
           
            var val=String(admin.gameTxtSearch);
          //   //$log.log("txtSearchChange ",val,typeof $scope.txtSearch);
            $("#gamesTable").data("kendoGrid").dataSource.filter({
                    logic: "or",
                    filters: [
                        {
                            field : "title",
                            operator: "contains",
                            value : val
                        },
                          {
                            field : "description",
                            operator: "contains",
                            value : val
                        },
                      
                    ]
                });
        }

        $(".tableGrid").hide();
        $("#dashboardGrid").show();

     }

    app.controller("AdminController", AdminController);

}());

