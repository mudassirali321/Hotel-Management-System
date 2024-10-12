import { IEmployee } from '../shared/models/IEmployee';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';
import { NotificationService } from '../Services/notification.service';
import { doctorService } from './doctor.service';
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
import { DoctorDialogComponent } from './doctor-dialog/doctor-dialog.component';
import { IDoctor } from 'app/shared/models/I_Doctor';

@Component({
    selector: 'app-doctor',
    templateUrl: './doctor.component.html',
    styleUrls: ['./doctor.component.scss'],
    providers: [doctorService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DoctorComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedRowId: number;
    dataSource: MatTableDataSource<IDoctor> = new MatTableDataSource();
    requestResult: any = null;
    isGridDataLoading: boolean;
    displayedColumns: string[] = ['Name', 'FatherName', 'Cell', 'Age', 'Address','Cnic','Specialist', 'isActive', 'Action'];
    formSecurity: IFormSecurity;
    isAddMode = true;
    constructor(private classService: doctorService,
        private _httpClient: HttpClient, public dialog: MatDialog, private _router: Router
        , private notification: NotificationService,

        private _cd: ChangeDetectorRef) {


    }

    ngOnInit(): void {

        this.refreshGrid();

    }
    refreshGrid(): void {

        this.isGridDataLoading = true;
        this.classService.getAllDoctors()
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
                    this.notification.fail('Error While Importing The Doctors');
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();
                    
                }

            );
    }
    addDoctor() {
        const dialogRef = this.dialog.open(DoctorDialogComponent, {
            height: "750px",
            width: "700px",
            data: null,
            panelClass: 'custom1-dialog-container',
        });
        dialogRef.afterClosed().subscribe(result => {
            let isOk: boolean = (result == undefined) ? false : result;
            if (isOk) {
                console.log(isOk);
                this.notification.success('New Doctor Successfully Inserted')
                this.refreshGrid();
                this.selectedRowId = null;
            }
            else if (isOk == undefined) {
                this.selectedRowId = null;
                this.refreshGrid();
            }

        });

    }

    editDoctor(obj: IDoctor, isEditMode: boolean): void {
        this.selectedRowId = obj.id;
        const dialogRef = this.dialog.open(DoctorDialogComponent,
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
                this.notification.success(' Doctor Succcessfully Updated !');
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
    deleteDoctor(doctorId: number) {
        if (doctorId != null) {
            
            this.classService.deleteDoctor(doctorId).subscribe(result => {
                this.requestResult = result;
               
                if (this.requestResult.result == true) {
                   
                    this.notification.success('Successfully Deleted Doctor Information');
                    this.refreshGrid();
                    this._cd.markForCheck();
                }
                else {

                    this.notification.fail('Error While Deleted The Doctor');
                    this.refreshGrid();
                }
            }, err => {

                this.notification.fail('Error While Deleted The Doctor');
                this.refreshGrid();
            });

        }
        else {
            this.notification.fail('Error While Deleted The Doctor');
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




