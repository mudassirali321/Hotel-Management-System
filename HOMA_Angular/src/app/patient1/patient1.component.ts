import { IEmployee } from '../shared/models/IEmployee';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';
import { NotificationService } from '../Services/notification.service';
import { patient1Service } from './patient1.service';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { IFormSecurity } from '../shared/models/IFormSecurity';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ChangeDetectorRef } from '@angular/core';
import { Patient1DialogComponent } from './patient1-dialog/patient1-dialog.component';
import { Ipatient1 } from 'app/shared/models/I_patient1';

@Component({
    selector: 'app-patient1',
    templateUrl: './patient1.component.html',
    styleUrls: ['./patient1.component.scss'],
    providers: [patient1Service],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Patient1Component implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedRowId: number;
    dataSource: MatTableDataSource<Ipatient1> = new MatTableDataSource();
    requestResult: any = null;
    isGridDataLoading: boolean;
    displayedColumns: string[] = ['PatientName', 'FatherName', 'Cell', 'Age', 'Address','Cnic','Disease', 'isActive', 'Action'];
    formSecurity: IFormSecurity;
    isAddMode = true;
    constructor(private classService: patient1Service,
        private _httpClient: HttpClient, public dialog: MatDialog, private _router: Router
        , private notification: NotificationService,

        private _cd: ChangeDetectorRef) {


    }

    ngOnInit(): void {

        this.refreshGrid();
    }
    refreshGrid(): void {

        this.isGridDataLoading = true;
        this.classService.getAllPatients()
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
    addPatient1() {
        const dialogRef = this.dialog.open(Patient1DialogComponent, {
            height: "750px",
            width: "700px",
            data: null,
            panelClass: 'custom1-dialog-container',
        });
        dialogRef.afterClosed().subscribe(result => {
            let isOk: boolean = (result == undefined) ? false : result;
            if (isOk) {
                console.log(isOk);
                this.notification.success('New Patient Successfully Inserted')
                this.refreshGrid();
                this.selectedRowId = null;
            }
            else if (isOk == undefined) {
                this.selectedRowId = null;
                this.refreshGrid();
            }

        });

    }

    editPatient1(obj: Ipatient1, isEditMode: boolean): void {
        this.selectedRowId = obj.id;
        const dialogRef = this.dialog.open(Patient1DialogComponent,
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
                this.notification.success(' Patient Succcessfully Updated !');
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
    deletePatient(patient1Id: number) {
        if (patient1Id != null) {
            
            this.classService.deletePatient1(patient1Id).subscribe(result => {
                this.requestResult = result;
               
                if (this.requestResult.result == true) {
                   
                    this.notification.success('Successfully Deleted Patient Information');
                    this.refreshGrid();
                    this._cd.markForCheck();
                }
                else {

                    this.notification.fail('Error While Deleted The Patient');
                    this.refreshGrid();
                }
            }, err => {

                this.notification.fail('Error While Deleted The Patient');
                this.refreshGrid();
            });

        }
        else {
            this.notification.fail('Error While Deleted The Patient');
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




