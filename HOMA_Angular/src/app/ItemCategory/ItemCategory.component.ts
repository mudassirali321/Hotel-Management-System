import { ItemCategoryService } from './ItemCategory.service';
import { ITableList } from './../shared/models/ITable-List';
import { ItemCategoryDialogComponent } from './ItemCategory-dialog/ItemCategory-dialog.component';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../Services/notification.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-ItemCategory',
    templateUrl: './ItemCategory.component.html',
    styleUrls: ['./ItemCategory.component.scss'],
    providers: [ItemCategoryService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ItemCategoryComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedRowId: string;
    requestResult: any = null;
    dataSource: MatTableDataSource<ITableList> = new MatTableDataSource();
    isGridDataLoading: boolean;
    displayedColumns: string[] = ['Title', 'Description', 'isActive', 'Action'];
    isAddMode = true;
    constructor(private _itemCategoryService: ItemCategoryService,
        private _httpClient: HttpClient, public dialog: MatDialog, private _router: Router
        , private notification: NotificationService,
        private _cd: ChangeDetectorRef) {


    }

    ngOnInit(): void {
        this.refreshGrid();
    }

    refreshGrid(): void {
        this.isGridDataLoading = true;
        this._itemCategoryService.getAllCategoryItems()
            .subscribe(data1 => {
                this.requestResult = data1;
                if (this.requestResult.success == true && this.requestResult.success != null) {
                    this.dataSource = new MatTableDataSource(this.requestResult.result);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();

                }
                if (this.requestResult.success == true && this.requestResult.success == null) {
                    this.dataSource = new MatTableDataSource(this.requestResult.result);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();

                }
            },
                err => {
                    this.notification.fail('Error While Importing Category Items');
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();


                }

            );
    }
    //Add Category Item
    AddCategoryItem() {
        const dialogRef = this.dialog.open(ItemCategoryDialogComponent, {
            height: "650px",
            width: "650px",
            data: null,
            panelClass: 'custom1-dialog-container',
        });
        dialogRef.afterClosed().subscribe(result => {
            let isOk = result;

            if (isOk == true) {
                this.notification.success(' Item Category Succcessfully Inserted!');
                this.refreshGrid();
                this.selectedRowId = null;
            }
            if (isOk == false) {
                this.notification.fail(' Error While Adding Item Category!');
                this.refreshGrid();
                this.selectedRowId = null;
                this._cd.markForCheck();
            }
            if (isOk == "Server") {
                this.notification.fail("Server is Down");
                this.selectedRowId = null;
                this._cd.markForCheck();
            }
            if (isOk == undefined) {
                this.selectedRowId = null;
                this._cd.markForCheck();

            }

        });

    }
    //Edit Category Item  
    editCategoryItem(obj: ITableList, isEditMode: boolean): void {
        this.selectedRowId = obj.id;
        const dialogRef = this.dialog.open(ItemCategoryDialogComponent,
            {
                panelClass: 'custom1-dialog-container',
                disableClose: false,
                height: "650px",
                width: "650px",
                data: {
                    obj: obj
                    , service: this._itemCategoryService, isEditMode: isEditMode
                }
            });

        dialogRef.afterClosed().subscribe(result => {

            let isOk = result;
            if (isOk == true) {
                this.notification.success(' Item Category Succcessfully Updated!');
                this.refreshGrid();
                this.selectedRowId = null;
                this._cd.markForCheck();
            }
            if (isOk == false) {
                this.notification.fail(' Error While Updating Item Category!');
                this.refreshGrid();
                this.selectedRowId = null;
                this._cd.markForCheck();
            }
            if (isOk == "Server") {
                this.notification.fail("Server is Down");
                this.selectedRowId = null;
                this._cd.markForCheck();
            }
            if (isOk == undefined) {
                this.selectedRowId = null;
                this._cd.markForCheck();

            }
        });
        err => {
            console.log(err);
            this._cd.markForCheck();
        }
    }
    // Delete Category Item
    deleteCategoryItem(categoryid: number) {
        if (categoryid != null) {

            this._itemCategoryService.deleteCateogryItem(categoryid).subscribe(result => {
                this.requestResult = result;

                if (this.requestResult.result == true && this.requestResult.success == true) {
                    this.notification.success('Category Item Successfully Deleted');
                    this.refreshGrid();
                    this._cd.markForCheck();
                }
                if (this.requestResult.result == false && this.requestResult.success == true) {
                    this.notification.success('Error While Deleted Category Item');
                    this.refreshGrid();
                    this._cd.markForCheck();
                }
            }, err => {

                this.notification.fail('Error While Deleted Category Item');
                    this.refreshGrid();
                    this._cd.markForCheck();
            });

        }
       
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
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




