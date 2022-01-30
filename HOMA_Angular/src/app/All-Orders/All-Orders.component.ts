
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'app/Services/notification.service';
import { MessageDialogComponent } from 'app/shared/message-dialog/message-dialog.component';
import { ChangeDetectorRef } from '@angular/core';
import { AllOrdersService } from './All-Orders.Service';
import { AllOrdersDialogComponent } from './All-Orders-dialog/All-Orders-dialog.component';
import { IOrder } from '../shared/models/IOrders';
import { AppService } from '../shared/services/app.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-All-Orders',
    templateUrl: './All-Orders.component.html',
    styleUrls: ['./All-Orders.component.scss'],
    providers: [DatePipe],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AllOrdersComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedRowId: string;
    requestResult: any = null;
    dataSource: MatTableDataSource<IOrder> = new MatTableDataSource();
    isGridDataLoading: boolean;
    displayedColumns: string[] = ['Id','TableName', 'CustomerName', 'orderStatus', 'amount', /*'isActive',*/ 'creationTime'];
    isAddMode = true;
    orderStatusList = [];
    fromDate: any=null;
    toDate: any = null;


    constructor(
        private _httpClient: HttpClient, public dialog: MatDialog, private _router: Router
        , private notification: NotificationService,
        public _kitchenService: AllOrdersService,
        private appService: AppService,
        public datepipe: DatePipe,
        private _cd: ChangeDetectorRef) {

        this.orderStatusList = this.appService.orderStatusList;
       
    }

    ngOnInit(): void {
        this.refreshGrid();
    }


    SearchRecord() {
       
       
    }

    getDateString(d1: string): string {
        if (d1 == null || d1 == undefined) {
            return null;
        }
        const d2 = new Date(d1);
        const d3 = this.datepipe.transform(d1, 'yyyy-MM-dd');

        return d3;
    }

    refreshGrid(): void {
        debugger;
        this.isGridDataLoading = true;
        let fromDate1 = this.getDateString(this.fromDate);
        let toDate1 = this.getDateString(this.toDate);

        this._kitchenService.getAllOrders(fromDate1, toDate1)
            .subscribe(data1 => {
                this.requestResult = data1;

                if (this.requestResult.success == true && this.requestResult.result!=null) {
                    
                    this.dataSource = new MatTableDataSource(this.requestResult.result);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();
                }
                if (this.requestResult.success == true && this.requestResult.result == null) {

                    this.dataSource = new MatTableDataSource(this.requestResult.result);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();
                }
               
            },
                err => {
                    
                    this.isGridDataLoading = false;
                    this.notification.fail('Error While Importing the All Orders');
                    this._cd.markForCheck();
                }
            );
    }

    ReviewOrderDetail(obj: IOrder) {
      
        const dialogRef = this.dialog.open(AllOrdersDialogComponent, {
            panelClass: 'custom1-dialog-container',
            width: '800px',
            height: '700px',
            data: {
                orderId: obj.id,
                orderStatus: obj.orderStatus
                , service: this._kitchenService,
                totalPrice: obj.totalPrice
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            let isOk: boolean = (result == undefined) ? false : result;
            if (isOk) {

                this.notification.success('Order Successfully Prepare!')
                this.refreshGrid();
                this.selectedRowId = null;
            }
            else if (isOk == undefined) {
                this.isGridDataLoading = null;
                this.selectedRowId = null;


            }

        });
        err => {
            console.log(err);
        }



    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        debugger;
        // for(let column of this.displayedColumns){
        // this.dataSource.filter = column;
        // this.dataSource.filter = filterValue.trim().toLowerCase();
        // }
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }


}

















