import { IEmployee } from '../shared/models/IEmployee';
import { MessageDialogComponent } from '../shared/message-dialog/message-dialog.component';
import { NotificationService } from '../Services/notification.service';
import { diseaseService } from './disease.service';
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
import { DiseaseDialogComponent } from './disease-dialog/disease-dialog.component';
import { IDisease } from 'app/shared/models/I_Disease';

@Component({
    selector: 'app-disease',
    templateUrl: './disease.component.html',
    styleUrls: ['./disease.component.scss'],
    providers: [diseaseService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DiseaseComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    selectedRowId: number;
    dataSource: MatTableDataSource<IDisease> = new MatTableDataSource();
    requestResult: any = null;
    isGridDataLoading: boolean;
    displayedColumns: string[] = ['Title', 'Symptoms','IsActive','Action'];
    formSecurity: IFormSecurity;
    isAddMode = true;
    constructor(private classService: diseaseService,
        private _httpClient: HttpClient, public dialog: MatDialog, private _router: Router
        , private notification: NotificationService,

        private _cd: ChangeDetectorRef) {


    }

    ngOnInit(): void {

        this.refreshGrid();

    }
    refreshGrid(): void {

        this.isGridDataLoading = true;
        this.classService.getAllDiseases()
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
                    this.notification.fail('Error While Importing The Diseases');
                    this.isGridDataLoading = false;
                    this._cd.markForCheck();
                    
                }

            );
    }
    addDisease() {
        const dialogRef = this.dialog.open(DiseaseDialogComponent, {
            height: "750px",
            width: "700px",
            data: null,
            panelClass: 'custom1-dialog-container',
        });
        dialogRef.afterClosed().subscribe(result => {
            let isOk: boolean = (result == undefined) ? false : result;
            if (isOk) {
                console.log(isOk);
                this.notification.success('New Disease Successfully Inserted')
                this.refreshGrid();
                this.selectedRowId = null;
            }
            else if (isOk == undefined) {
                this.selectedRowId = null;
                this.refreshGrid();
            }

        });

    }

    editDisease(obj: IDisease, isEditMode: boolean): void {
        this.selectedRowId = obj.id;
        const dialogRef = this.dialog.open(DiseaseDialogComponent,
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
                this.notification.success(' Disease Succcessfully Updated !');
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
    deleteDisease(diseaseId: number) {
        if (diseaseId != null) {
            
            this.classService.deleteDisease(diseaseId).subscribe(result => {
                this.requestResult = result;
               
                if (this.requestResult.result == true) {
                   
                    this.notification.success('Successfully Deleted Disease Information');
                    this.refreshGrid();
                    this._cd.markForCheck();
                }
                else {

                    this.notification.fail('Error While Deleted The Disease');
                    this.refreshGrid();
                }
            }, err => {

                this.notification.fail('Error While Deleted The Disease');
                this.refreshGrid();
            });

        }
        else {
            this.notification.fail('Error While Deleted The Disease');
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




