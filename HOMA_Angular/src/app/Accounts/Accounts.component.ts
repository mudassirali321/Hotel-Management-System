
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
import { AccountsService } from './Accounts.Service';
import { AccountsDialogComponent } from './Accounts-dialog/Accounts-dialog.component';
import { IOrder } from '../shared/models/IOrders';
import { AppService } from '../shared/services/app.service';

@Component({
    selector: 'app-Accounts',
    templateUrl: './Accounts.component.html',
    styleUrls: ['./Accounts.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AccountsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedRowId: string;
    requestResult: any = null;
    dataSource: MatTableDataSource<IOrder> = new MatTableDataSource();
    isGridDataLoading: boolean;
    displayedColumns: string[] = ['Id','TableName', 'CustomerName', 'orderStatus', 'amount' /*'isActive'*/, 'Action'];
    isAddMode = true;
    orderStatusList = [];

    constructor(
        private _httpClient: HttpClient, public dialog: MatDialog, private _router: Router
        , private notification: NotificationService,
        public _kitchenService: AccountsService,
        private appService: AppService,
        private _cd: ChangeDetectorRef) {

        this.orderStatusList = this.appService.orderStatusList;

    }

    ngOnInit(): void {
        this.refreshGrid();
    }
 
    refreshGrid(): void {
        this.isGridDataLoading = true;
        this._kitchenService.getAllActiveOrders()
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
                    this.notification.fail('Error While Importing the Orders');
                    this._cd.markForCheck();
                    console.log(err);
                }
            );
    }

    ReviewOrderDetail(obj: IOrder) {
        debugger;
        const dialogRef = this.dialog.open(AccountsDialogComponent, {
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

                this.notification.success('Order Successfully Updated!')
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

















