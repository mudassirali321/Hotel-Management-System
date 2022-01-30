import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I_ItemCategory } from './../shared/models/I_ItemCategory';
import { I_Item } from './../shared/models/I_Item';
import { ItemsService } from './Item.service';
import { MessageDialogComponent } from './../shared/message-dialog/message-dialog.component';
import { NotificationService } from './../Services/notification.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IFormSecurity } from '../shared/models/IFormSecurity';
import { ChangeDetectorRef } from '@angular/core';
import { ItemDialogComponent } from './Item-dialog/Item-dialog.component';

@Component({
    selector: 'app-Item',
    templateUrl: './Item.component.html',
    styleUrls: ['./Item.component.scss'],
    providers: [ItemsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ItemComponent implements OnInit {
    requestResult: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedRowId: number;
    selectedCategoryId: number;
    categoryList: I_ItemCategory[] = null;
    dataSource: MatTableDataSource<I_Item> = new MatTableDataSource();//I_Item
    isGridDataLoading: boolean;
    displayedColumns: string[] = ['Item', 'ItemDescription', 'SalePrice', 'SaleTaxPrice', 'ItemCategory', 'Image', 'isActive', 'Action'];
    formSecurity: IFormSecurity;
    isAddMode = true;

    constructor(private _itemService: ItemsService,
        private _httpClient: HttpClient
        , public dialog: MatDialog
        , private _router: Router
        , private notification: NotificationService
        , private fb: FormBuilder,
        private _cd: ChangeDetectorRef) {

    }

    ngOnInit(): void {
        this.loadBasicData();
        this.refreshGrid();
        this.selectedCategoryId = -1;
    }

    loadBasicData() {
      
        this._itemService.getActiveCategoryItems().subscribe(data => {
          
            this.requestResult = data;
            
            if (this.requestResult.success == true && this.requestResult.result!=null) {
              
                this.categoryList = data.result;

                this._cd.markForCheck();
            }
        }, err => {
              
                this.notification.fail('Error While Importing the Category Items');
                this._cd.markForCheck();
        });
    }

    refreshGrid(): void {
        this.selectedCategoryId = -1;
        this.isGridDataLoading = true;
        this._itemService.getAllItems()
            .subscribe(data1 => {
                this.requestResult = data1;
                
                if (this.requestResult.success == true && this.requestResult.result != null) {
                    
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
                    this.notification.fail('Error While Importing the Items');
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();
                    
                }
            );
    }

    searchItemOnCategoryId(selectedCatObj: I_ItemCategory) {

        this.selectedCategoryId = selectedCatObj.id;
        if (this.selectedCategoryId > 0) {
            this._itemService.getItemsOnCategory(this.selectedCategoryId).subscribe(data1 => {
                this.requestResult = data1;
                if (this.requestResult.success == true) {
                    this.dataSource = new MatTableDataSource(this.requestResult.result);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();
                }
            },
                err => {
                    this.notification.fail('Error While Importing the Items On Category Item');
                    this.isGridDataLoading = false;
                    
                    this._cd.markForCheck();
                }

            );
        }
        else if (this.selectedCategoryId == -1) {
            this.refreshGrid();
        }

    }

    //Add New Item
    addItem()
    {
        const dialogRef = this.dialog.open(ItemDialogComponent, {
            height: "auto",
            width: "800px",
            data: null,
            panelClass: 'custom1-dialog-container',
        });
        dialogRef.afterClosed().subscribe(result => {
            let isOk = result;
            if (isOk == true) {
                this.notification.success(' Item Succcessfully Inserted!');
                this.refreshGrid();
                this.selectedRowId = null;
                this._cd.markForCheck();
            }
            if (isOk == false) {
                this.notification.fail(' Error While Inserted Item!');
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

    editItem(obj: I_Item, isEditMode: boolean): void {
        this.selectedRowId = obj.id;
        const dialogRef = this.dialog.open(ItemDialogComponent,
            {
                panelClass: 'custom1-dialog-container',
                disableClose: false,
                height: "auto",
                width: "800px",
                data: {
                    obj: obj
                    , service: this._itemService, isEditMode: isEditMode
                }
            });

        dialogRef.afterClosed().subscribe(result => {
            let isOk = result;

            if (isOk == true) {
                this.notification.success(' Item Succcessfully Updated!');
                this.refreshGrid();
                this.selectedRowId = null;
                this._cd.markForCheck();
            }
            if (isOk == false) {
                this.notification.fail(' Error While Updating  Item!');
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
        }
    }

    deleteItem(id: number) {
        if (id != null) {
            this._itemService.deleteItem(id).subscribe(result => {
                this.requestResult = result;
               
                if (this.requestResult.success == true && this.requestResult.result==true) {
                    this._itemService.deleteItemPhoto(id).subscribe(data => {
                        this.requestResult = data;
                        debugger;
                        if (this.requestResult.success == true) {
                            debugger;
                            this.notification.success('Successfully Deleted Item');
                            this.refreshGrid();
                            this.selectedRowId = null;
                        }
                    }, err => {
                            this.notification.fail('Error While Deleted The Image');
                            console.log(err);
                    })
                }
                if (this.requestResult.success == true && this.requestResult.result == false) {
                    this.notification.fail('Error While Deleted the Item');
                    this._cd.markForCheck();
                }
               
            }, err => {
                    debugger;
                 this.notification.fail('Error While Deleted the Item');
                console.log(err);
                this._cd.markForCheck();
            });

        }
    }

    applyFilter(event: Event)
    {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
            this._cd.markForCheck();
        }
    }
}




