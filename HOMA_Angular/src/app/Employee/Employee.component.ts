import { IEmployee } from './../shared/models/IEmployee';
import { MessageDialogComponent } from './../shared/message-dialog/message-dialog.component';
import { NotificationService } from './../Services/notification.service';
import { EmployeeService } from './Employee.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { IFormSecurity } from '../shared/models/IFormSecurity';

import { ChangeDetectorRef } from '@angular/core';
import { EmployeeDialogComponent } from './Employee-dialog/Employee-dialog.component';

@Component({
    selector: 'app-Employee',
    templateUrl: './Employee.component.html',
    styleUrls: ['./Employee.component.scss'],
    providers: [EmployeeService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EmployeeComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedRowId: number;
    dataSource: MatTableDataSource<IEmployee> = new MatTableDataSource();
    requestResult: any = null;
    isGridDataLoading: boolean;
    displayedColumns: string[] = ['FirstName', 'LastName', 'EmployeeType', 'Age', 'Gender', 'isActive', 'Action'];
    formSecurity: IFormSecurity;
    isAddMode = true;
    constructor(private classService: EmployeeService,
        private _httpClient: HttpClient, public dialog: MatDialog, private _router: Router
        , private notification: NotificationService,

        private _cd: ChangeDetectorRef) {


    }

    ngOnInit(): void {

        this.refreshGrid();
    }
    refreshGrid(): void {

        this.isGridDataLoading = true;
        this.classService.getAllEmployees()
            .subscribe(data1 => {
                this.requestResult = data1;
                
                if (this.requestResult.success == true   && this.requestResult.result !=null) {

                    this.dataSource = new MatTableDataSource(this.requestResult.result);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();

                }

                if (this.requestResult.success = true && this.requestResult.result==null) {

                    this.dataSource = new MatTableDataSource(this.requestResult.result);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();

                }
            },
                err => {
                    this._cd.markForCheck();
                    this.notification.fail('Error While Importing The Employees');
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();
                    
                }

            );
    }
    addEmployee() {
        const dialogRef = this.dialog.open(EmployeeDialogComponent, {
            height: "750px",
            width: "700px",
            data: null,
            panelClass: 'custom1-dialog-container',
        });
        dialogRef.afterClosed().subscribe(result => {
            let isOk: boolean = (result == undefined) ? false : result;
            if (isOk) {
                console.log(isOk);
                this.notification.success('New Employee Successfully Inserted')
                this.refreshGrid();
                this.selectedRowId = null;
            }
            else if (isOk == undefined) {
                this.selectedRowId = null;
                this.refreshGrid();
            }

        });

    }

    editEmployee(obj: IEmployee, isEditMode: boolean): void {
        this.selectedRowId = obj.id;
        const dialogRef = this.dialog.open(EmployeeDialogComponent,
            {
                panelClass: 'custom1-dialog-container',
                disableClose: false,
                height: "750px",
                width: "700px",
                data: {
                    obj: obj
                    , isEditMode: isEditMode
                }
            });

        dialogRef.afterClosed().subscribe(result => {
            let isOk: boolean = (result == undefined) ? false : result;
            if (isOk) {
                this.notification.success(' Employee Succcessfully Updated !');
                this.selectedRowId = null;
                this.refreshGrid();
            
            }
            else if (isOk == undefined) {
                this.selectedRowId = null;
                this._cd.markForCheck();

            }
        });
        err => {
            console.log(err);
        }
    }
    deleteEmployee(employeeId: number) {
        if (employeeId != null) {
            
            this.classService.deleteEmployee(employeeId).subscribe(result => {
                this.requestResult = result;
               
                if (this.requestResult.result == true) {
                   
                    this.notification.success('Successfully Deleted Employee Information');
                    this.refreshGrid();
                    this._cd.markForCheck();
                }
                else {

                    this.notification.fail('Error While Deleted The Employee');
                    this.refreshGrid();
                }
            }, err => {

                this.notification.fail('Error While Deleted The Employee');
                this.refreshGrid();
            });

        }
        else {
            this.notification.fail('Error While Deleted The Employee');
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




