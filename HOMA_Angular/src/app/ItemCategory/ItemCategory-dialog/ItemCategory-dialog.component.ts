import { I_ItemCategory } from './../../shared/models/I_ItemCategory';
import { ItemCategoryService } from '../ItemCategory.service';
import { ITableList } from './../../shared/models/ITable-List';
import { Component, Inject, NgZone, OnInit, ElementRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from '../../Services/notification.service';
import { AppService } from '../../shared/services/app.service';

@Component({
    selector: 'app-ItemCategory-dialog',
    templateUrl: './ItemCategory-dialog.component.html',
    styleUrls: ['./ItemCategory-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCategoryDialogComponent implements OnInit {
    requestResult: any = null;
    isEditMode: boolean;
    form1: FormGroup;
    title: string;
    classObj: I_ItemCategory = null;
    validation_messages = {

        'Title': [
            { type: 'required', message: 'Name  is required' },
        ],
        'Description': [
            { type: 'required', message: ' Description is required' },
        ]
    };

    constructor(
        public dialogRef: MatDialogRef<ItemCategoryDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder, private appService: AppService,
        private _itemCategoryservice: ItemCategoryService,
        private notification: NotificationService,
        private el: ElementRef,
        private _cd: ChangeDetectorRef) {
        this.classObj = this.initObject();
        if (this.data == null) {
        }
        if (data != null) {
            //Update Case
            this.classObj = data.obj;
            this._itemCategoryservice = data.service;
            this.isEditMode = data.isEditMode;

        }
        else {
            //Insert Case

            this.isEditMode = false;
        }
    }

    ngOnInit(): void {
        this.createForm();
        this.setFormValues(this.classObj);
    }


    createForm() {
        this.form1 = this.fb.group({
            Id: [{ value: null, disabled: true },],
            Title: ["", [Validators.required]],
            Description: [""],
            isActive: ["False"],

        });
    }

    setFormValues(obj: I_ItemCategory) {
        this.form1.patchValue({
            Id: obj.id,
            Title: obj.title,
            Description: obj.description,
            isActive: obj.isActive
        });
    }

    //update Record
    initObject() {
        {
            var obj = {} as I_ItemCategory;
            //default values      

            return obj;
        }
    }
    private getValuesIntoObject() {

        this.classObj.id = this.form1.get('Id').value;
        this.classObj.title = this.form1.get('Title').value;
        this.classObj.description = this.form1.get('Description').value;
        this.classObj.isActive = this.form1.get('isActive').value;
    }
    saveCategoryItem() {

        this.getValuesIntoObject();
        this._itemCategoryservice.updateOrInsertCategoryItem(this.classObj)
            .subscribe(data => {
                this.requestResult = data;
                if (this.requestResult.result == true && this.requestResult.success == true) {
                    //this.data.isOK = true;
                    this.dialogRef.close(true);
                    this._cd.markForCheck();
                }
                if (this.requestResult.result == false && this.requestResult.success == true) {
                    //this.data.isOK = true;
                    this.dialogRef.close(false);
                    this._cd.markForCheck();
                }
            },
                err => {
                    this.dialogRef.close("Server");
                    console.log(err);
                    this._cd.markForCheck();

                }
            );

    }



}
