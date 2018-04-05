(function() {

    var app = angular.module("myFrontend");

    var DashboardController = function($rootScope,$http,$scope,$log,$stateParams,$anchorScroll) {
        var videoplayer = this;
        $log.info("DashboardController init");


         function createChart() {


 	 $("#chart1").kendoChart({
                title: {
                    text: ""
                },
                legend: {
                    position: "bottom"
                },
                chartArea: {
                    background: ""
                },
                seriesDefaults: {
                    type: "line",
                    stack:"true"
                   
                },
                series: [{
                    name: "Jasmine",
                    data: [40, 32, 34, 36, 45, 33, 34]
                },{
                    name: "Chocolate",
                    data: [19, 25, 21, 26, 28, 31, 35]
                },{
                    name: "Cinnamon",
                    data: [17, 17, 16, 28, 34, 30, 25]
                },{
                    name: "Vanilla",
                    data: [25, 36, 35, 17, 22, 33,  28]
                }],
                valueAxis: {
                	
                    labels: {
                        format: "{0}"
                    },
                    line: {
                        visible: false
                    },
                    
                },
                categoryAxis: {
                    categories: [ '10/18', '11/17', '12/17', '1/18', '2/18', '3/18', '4/18'],
                    majorGridLines: {
                        visible: false
                    },
                    labels: {
                        rotation: "auto"
                    }
                },
                tooltip: {
                    visible: true,
                    format: "{0}%",
                    template: "#= series.name #: #= value #"
                }
            });



            $("#chart2").kendoChart({
                title: {
                    text: ""
                },
                legend: {
                    position: "bottom"
                },
                chartArea: {
                    background: ""
                },
                seriesDefaults: {
                    type: "line",
                    style: "smooth"
                },
                series: [{
                    name: "Mixer Effect",
                    data: [39, 79, 78, 92, 92, 98, 38, 82, 95, 85]
                },{
                    name: "Whirlwind",
                    data: [19, 27, 39, 34, 40, 33, 13, 22, 43, 27]
                },{
                    name: "Ripple",
                    data: [47, 72, 71, 63, 81, 85, 52, 38, 43, 79]
                },{
                    name: "Heat/Fire",
                    data: [25, 36, 35, 17, 22, 33, 84, 28, 54, 90]
                }],
                valueAxis: {
                    labels: {
                        format: "{0}"
                    },
                    line: {
                        visible: false
                    },
                    axisCrossingValue: -10
                },
                categoryAxis: {
                    categories: ['7/17', '8/17', '9/17', '10/18', '11/17', '12/17', '1/18', '2/18', '3/18', '4/18'],
                    majorGridLines: {
                        visible: false
                    },
                    labels: {
                        rotation: "auto"
                    }
                },
                tooltip: {
                    visible: true,
                    format: "{0}%",
                    template: "#= series.name #: #= value #"
                }
            });

     $("#chart3").kendoChart({
                title: {
                    text: ""
                },
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: "bar"
                },
                series: [{
                    name: "Total Prints",
                    data: [56000, 63000, 74000, 91000, 117000, 138000]
                }],
                valueAxis: {
                    max: 140000,
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: true
                    },
                    labels: {
                        rotation: "auto"
                    }
                },
                categoryAxis: {
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    majorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= value #"
                }
            });

     //vr played
   $("#chart4").kendoChart({
                title: {
                    text: ""
                },
                legend: {
                    visible: false
                },
                seriesDefaults: {
                    type: "bar",
                    stack: true
                },
                series: [{
                    name: "HiQ",
                    data: [40, 32, 34, 36, 45, 33, 34, 83, 36, 37, 44, 37, 35, 36, 46],
                    color: "#f3ac32"
                }, {
                    name: "MedQ",
                    data: [19, 25, 21, 26, 28, 31, 35, 60, 31, 34, 32, 24, 40, 38, 29],
                    color: "#b8b8b8"
                }, {
                    name: "LowQ",
                    data: [17, 17, 16, 28, 34, 30, 25, 30, 27, 37, 25, 33, 26, 36, 29],
                    color: "#bb6e36"
                }],
                valueAxis: {
                    max: 180,
                    line: {
                        visible: false
                    },
                    minorGridLines: {
                        visible: true
                    }
                },
                categoryAxis: {
                	 categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Aug","Sep","Oct","Nov","Dec","Jan", "Feb", "Mar"],
                 
                    majorGridLines: {
                        visible: false
                    }
                },
                tooltip: {
                    visible: true,
                    template: "#= series.name #: #= value #"
                }
            });
        }
        createChart();
       
     }

    app.controller("DashboardController", DashboardController);

}());