import { Ipatient1 } from '../../shared/models/I_patient1';
import { NotificationService } from '../../Services/notification.service';
import { patient1Service } from '../patient1.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../shared/services/app.service';
@Component({
  selector: 'app-patient1-dialog',
  templateUrl: './patient1-dialog.component.html',
  styleUrls: ['./patient1-dialog.component.scss'],
})
export class Patient1DialogComponent implements OnInit {
    requestResult: any = null;
    employeeId: number;
    itemPhoto: File;  
    fileToUpload: FileList;
    imageUrl: File ;  //Upload Image Url
    isEditMode: boolean;
    form1: FormGroup;
    title : string;
    classObj: Ipatient1 ;
    empTypes = [];

    validation_messages = {
 
      'PatientName': [
        { type: 'required', message: ' First Name  is Required' },
      ],
      'FatherName': [
        { type: 'required', message: ' First Name  is Required' },
      ],
        'Cell': [
        { type: 'required', message: ' Employee Type is Required' },
      ],
       'Age': [
        { type: 'required', message: ' password  is Required' },
      ],
      'Address': [
        { type: 'required', message: ' password  is Required' },
      ],
      'Cnic': [
        { type: 'required', message: ' password  is Required' },
      ],
      'Disease': [
        { type: 'required', message: ' password  is Required' },
      ]
    };

  constructor(
    public dialogRef: MatDialogRef<Patient1DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
      private fb: FormBuilder
      , private appService: AppService
      , private service: patient1Service,
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
        PatientName: ["",[Validators.required]],
        FatherName: ["", [Validators.required]],
        Age: ["", [Validators.required]],
        Cell: ["", [Validators.required]],
        Address: [""],
        Cnic: [""],
        Disease:[""],
        isActive: ["False"],
       // employeeType: ["",[Validators.required]],
        password: [""],
      });
  }

  //Set Form Values
    setFormValues(obj: Ipatient1) {
       
    this.form1.patchValue({
        Id: obj.id,
        PatientName:  obj.patientName,
        FatherName:  obj.fatherName,
        Cell:  obj.cell,

        Age: obj.age,
        Address: obj.address,
         Cnic: obj.cnic,
        Disease: obj.disease,

       // password: obj.password

    });
  }

   //Initialiaze Object
    initObject() {
      {
        var obj = {} as Ipatient1;
        //default values      
  
        return obj;
      }
    }
    //Get Form Values in Object
    private getValuesIntoObject() {
    
      this.classObj.id = this.form1.get('Id').value;
      this.classObj.patientName = this.form1.get('PatientName').value;
      this.classObj.fatherName = this.form1.get('FatherName').value;
      this.classObj.cell= this.form1.get('Cell').value;

      this.classObj.age = this.form1.get('Age').value;
        this.classObj.address = this.form1.get('Address').value;
      this.classObj.cnic = this.form1.get('Cnic').value;
        this.classObj.disease = this.form1.get('Disease').value;
        
       this.classObj.isActive = this.form1.get('isActive').value;


      
    }

  //Save Employee
savePatient1() {
      this.getValuesIntoObject();
      this.service.updateOrInsertPatient1(this.classObj)
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
