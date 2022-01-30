import { IEmployee } from './../../shared/models/IEmployee';
import { NotificationService } from '../../Services/notification.service';
import { EmployeeService } from '../Employee.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../shared/services/app.service';
@Component({
  selector: 'app-Employee-dialog',
  templateUrl: './Employee-dialog.component.html',
  styleUrls: ['./Employee-dialog.component.scss'],
})
export class EmployeeDialogComponent implements OnInit {
    requestResult: any = null;
    employeeId: number;
    itemPhoto: File;  
    fileToUpload: FileList;
    imageUrl: File ;  //Upload Image Url
    isEditMode: boolean;
    form1: FormGroup;
    title : string;
    classObj: IEmployee = null;
    empTypes = [];

    validation_messages = {
 
      'firstName': [
        { type: 'required', message: ' First Name  is Required' },
      ],
      'userName': [
        { type: 'required', message: ' First Name  is Required' },
      ],
        'employeeType': [
        { type: 'required', message: ' Employee Type is Required' },
      ],
       'password': [
        { type: 'required', message: ' password  is Required' },
      ]
    };

  constructor(
    public dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
      private fb: FormBuilder
      , private appService: AppService
      , private service: EmployeeService,
      private notification: NotificationService) { 

      this.empTypes = this.appService.empTypes;
      this.classObj = this.initObject();
      if(this.data == null){ 
      }
      if (data != null) {
        this.classObj= data.obj;
        this.isEditMode= data.isEditMode;
                
      }
      else
      {
      
        this.isEditMode= false;
      }
    }

  ngOnInit(): void {
    this.createForm();
    this.setFormValues(this.classObj);
  }


  createForm(){
    this.form1 = this.fb.group({
        Id: [{value:null, disabled: true},],
        firstName: ["",[Validators.required]],
        userName: ["", [Validators.required]],
        emailAddress: ["", [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

        lastName: [""],
        gender: [""],
        age:[""],
        isActive: ["False"],
        employeeType: ["",[Validators.required]],
        password: [""],
      });
  }

  //Set Form Values
    setFormValues(obj: IEmployee) {
       
    this.form1.patchValue({
        Id: obj.id,
        firstName:  obj.firstName,
        userName:  obj.userName,
        emailAddress:  obj.emailAddress,

        lastName: obj.lastName,
        gender: obj.gender,
         age: obj.age,
        isActive: obj.isActive,
        employeeType: obj.employeeType,
       // password: obj.password

    });
  }

   //Initialiaze Object
    initObject() {
      {
        var obj = {} as IEmployee;
        //default values      
  
        return obj;
      }
    }
    //Get Form Values in Object
    private getValuesIntoObject() {
    
      this.classObj.id = this.form1.get('Id').value;
      this.classObj.firstName = this.form1.get('firstName').value;
      this.classObj.emailAddress = this.form1.get('emailAddress').value;
      this.classObj.userName = this.form1.get('userName').value;

      this.classObj.lastName = this.form1.get('lastName').value;
        this.classObj.employeeType = this.form1.get('employeeType').value;
      this.classObj.gender = this.form1.get('gender').value;
        this.classObj.age = this.form1.get('age').value;
        
       this.classObj.isActive = this.form1.get('isActive').value;
      this.classObj.password = this.form1.get('password').value;

      
    }

  //Save Employee
saveEmployee() {
      this.getValuesIntoObject();
      this.service.updateOrInsertEmployee(this.classObj)
          .subscribe(data => {
              
              this.requestResult = data;
              if (this.requestResult.result == true) 
          {
            
            //this.data.isOK = true;
            this.dialogRef.close(true);
            
          } else {
            console.log('Problem while saving the record');
          }
  
        },
        err => {
          console.log(err);

          
        }
        );
  
    }
    uploadPhoto(file: FileList) {

  if(file && file[0])
  {
    this.itemPhoto = file[0];
    this.fileToUpload = file;
  }
  else {
     return; 
    }
  if(this.employeeId == null || this.employeeId === 0 )
  {
    this.displayImage(file);
    return;
  }
}

displayImage(file : FileList){
  
 this.imageUrl =file[0];
 const reader = new FileReader();
 reader.onload= (event:any)=>{
   this.imageUrl=event.target.result;
 };

 if(file){
   reader.readAsDataURL(this.imageUrl);
 } 

}
btnCancelImage()
{
  this.imageUrl= null;
  this.fileToUpload=null;
}
private validateForm(): boolean {
  this.form1.markAllAsTouched();
  return this.form1.valid;
 }
    
     

}
