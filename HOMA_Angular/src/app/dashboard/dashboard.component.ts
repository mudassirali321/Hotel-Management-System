import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { KitchenService } from '../Kitchen/Kitchen.Service';
import { NotificationService } from '../Services/notification.service';
import { IOrder } from '../shared/models/IOrders';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
    requestResult: any = null;
    todayActiveOrders: [] = [];
    todaySuccessfullyClosedOrders: [] = [];
    todayWithoutProcessOrders: IOrder[] = [];
    todayRevenue = 0;
    todayTotalOpenAndClosedOrders: [] = [];


    constructor(private _kitchenService: KitchenService,
        private _cd: ChangeDetectorRef,
        private _notification: NotificationService) { }

    get_tadayOrderinfo() {
        this.getTodayActiveOrders();
        this.getTodaySuccessfullyClosedOrders();
        this.getTodayWithOutProcessOrders();
        this.getTodayRevenue();
        this.getAllTodayTotalOrders();
    }


    getTodayActiveOrders() {
        this._kitchenService.getTodayActiveOrders().subscribe(data => {
            this.requestResult = data;
       
            if (this.requestResult.result != null) {
                this.todayActiveOrders = this.requestResult.result;
                
                this._cd.markForCheck();
            }
        }, err => {
            this._notification.fail('Error While Importing Today Active Orders');
            this._cd.markForCheck();

        })
    }


    getTodaySuccessfullyClosedOrders()
    {
        this._kitchenService.getTodaySuccessfullyClosedOrders().subscribe(data => {
            this.requestResult = data;
           
            if (this.requestResult.result != null) {
                this.todaySuccessfullyClosedOrders = this.requestResult.result;
                
                this._cd.markForCheck();
            }
        }, err => {
            this._notification.fail('Error While Importing Successfully Closed Orders');
            this._cd.markForCheck();
        })
    }


 getTodayWithOutProcessOrders() {
     this._kitchenService.getTodayWithoutProcessOrders().subscribe(data => {
            this.requestResult = data;
            
         if (this.requestResult.result != null) {
             this.todayWithoutProcessOrders = this.requestResult.result;
               
                this._cd.markForCheck();
            }
        }, err => {
            this._notification.fail('Error While Importing Today Without Processed Orders');
            this._cd.markForCheck();
        })
    }

 
    getTodayRevenue() {
        this.todayRevenue = 0;
        this._kitchenService.getTodayRevenue().subscribe(data => {
            this.requestResult = data;
            
            if (this.requestResult.result != null) {
                
                this.todayRevenue = this.requestResult.result;

                this._cd.markForCheck();
            }
        }, err => {
            this._notification.fail('Error While Importing Today Without Processed Orders');
            this._cd.markForCheck();
        })
    }

getAllTodayTotalOrders() {
        this._kitchenService.getAllTodayTotalOrders().subscribe(data => {
            this.requestResult = data;
            
            if (this.requestResult.result != null) {
                this.todayTotalOpenAndClosedOrders = this.requestResult.result;

                this._cd.markForCheck();
            }
        }, err => {
            this._notification.fail('Error While Importing Today Open and Successfully Closed Orders');
            this._cd.markForCheck();
        })
    }

    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 600,
                        dur: 700,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                    opacity: {
                        begin: seq * delays,
                        dur: durations,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq = 0;
    };

    startAnimationForBarChart(chart) {
        let seq2: any, delays2: any, durations2: any;

        seq2 = 0;
        delays2 = 80;
        durations2 = 500;
        chart.on('draw', function (data) {
            if (data.type === 'bar') {
                seq2++;
                data.element.animate({
                    opacity: {
                        begin: seq2 * delays2,
                        dur: durations2,
                        from: 0,
                        to: 1,
                        easing: 'ease'
                    }
                });
            }
        });

        seq2 = 0;
    };

    ngOnInit() {
        this.get_tadayOrderinfo();

        ///* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

        //const dataDailySalesChart: any = {
        //    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        //    series: [
        //        [12, 17, 7, 17, 23, 18, 38]
        //    ]
        //};

        //const optionsDailySalesChart: any = {
        //    lineSmooth: Chartist.Interpolation.cardinal({
        //        tension: 0
        //    }),
        //    low: 0,
        //    high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        //    chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
        //}

        //var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        //this.startAnimationForLineChart(dailySalesChart);


        ///* ----------==========     Completed Tasks Chart initialization    ==========---------- */

        //const dataCompletedTasksChart: any = {
        //    labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        //    series: [
        //        [230, 750, 450, 300, 280, 240, 200, 190]
        //    ]
        //};

        //const optionsCompletedTasksChart: any = {
        //    lineSmooth: Chartist.Interpolation.cardinal({
        //        tension: 0
        //    }),
        //    low: 0,
        //    high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        //    chartPadding: { top: 0, right: 0, bottom: 0, left: 0 }
        //}

        //var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        //// start animation for the Completed Tasks Chart - Line Chart
        //this.startAnimationForLineChart(completedTasksChart);



        ///* ----------==========     Emails Subscription Chart initialization    ==========---------- */

        //var datawebsiteViewsChart = {
        //    labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        //    series: [
        //        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

        //    ]
        //};
        //var optionswebsiteViewsChart = {
        //    axisX: {
        //        showGrid: false
        //    },
        //    low: 0,
        //    high: 1000,
        //    chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
        //};
        //var responsiveOptions: any[] = [
        //    ['screen and (max-width: 640px)', {
        //        seriesBarDistance: 5,
        //        axisX: {
        //            labelInterpolationFnc: function (value) {
        //                return value[0];
        //            }
        //        }
        //    }]
        //];
        //var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

        ////start animation for the Emails Subscription Chart
        //this.startAnimationForBarChart(websiteViewsChart);
    }

}
