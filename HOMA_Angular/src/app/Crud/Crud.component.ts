
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
import { CrudService } from './Crud.Service';
import { IOrder } from '../shared/models/IOrders';
import { AppService } from '../shared/services/app.service';

@Component({
    selector: 'app-Crud-list',
    templateUrl: './Crud.component.html',
    styleUrls: ['./Crud.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CrudComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedRowId: string;
    requestResult: any = null;
    dataSource: MatTableDataSource<IOrder> = new MatTableDataSource();
    isGridDataLoading: boolean;
    displayedColumns: string[] = ['TableName', 'CustomerName', 'orderStatus', /*'isActive',*/ 'Action'];
    isAddMode = true;
    orderStatusList = [];

    constructor(
        private _httpClient: HttpClient, public dialog: MatDialog, private _router: Router
        , private notification: NotificationService,
        public _CrudService: CrudService,
        private appService: AppService,
        private _cd: ChangeDetectorRef) {
        this.orderStatusList = this.appService.orderStatusList;

    }

    ngOnInit(): void {
        this.refreshGrid();
    }
 
    refreshGrid(): void {
        this.isGridDataLoading = true;

    }

    // ReviewOrderDetail(obj: IOrder) {
        
    //     const dialogRef = this.dialog.open(CrudDialogComponent, {
    //         panelClass: 'custom1-dialog-container',
    //         width: '800px',
    //         height: '700px',
    //         data: {
    //             orderId: obj.id,
    //             orderStatus: obj.orderStatus
    //             , service: this._kitchenService
    //         }
    //     });
    //     dialogRef.afterClosed().subscribe(result => {
    //         let isOk: boolean = (result == undefined) ? false : result;
    //         if (isOk) {

    //             this.notification.success('Order Successfully Updated!')
    //             this.refreshGrid();
    //             this.selectedRowId = null;
    //         }
    //         else if (isOk == undefined) {
    //             this.isGridDataLoading = null;
    //             this.selectedRowId = null;
    //             this._cd.markForCheck();
    //         }

    //     });
    //     err => {
    //         console.log(err);
    //         this._cd.markForCheck();
    //     }



    // }

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

















