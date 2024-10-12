import { IDoctor } from '../../shared/models/I_Doctor';
import { NotificationService } from '../../Services/notification.service';
import { doctorService } from '../doctor.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../shared/services/app.service';
@Component({
  selector: 'app-doctor-dialog',
  templateUrl: './doctor-dialog.component.html',
  styleUrls: ['./doctor-dialog.component.scss'],
})
export class DoctorDialogComponent implements OnInit {
    requestResult: any = null;
    doctorId: number;
    itemPhoto: File;  
    fileToUpload: FileList;
    imageUrl: File ;  //Upload Image Url
    isEditMode: boolean;
    form1: FormGroup;
    title : string;
    classObj: IDoctor ;
    empTypes = [];

    validation_messages = {
 
      'Name': [
        { type: 'required', message: ' Name  is Required' },
      ],
      'FatherName': [
        { type: 'required', message: ' Father Name  is Required' },
      ],
        'Cell': [
        { type: 'required', message: ' Phone No is Required' },
      ],
       'Age': [
        { type: 'required', message: ' Age  is Required' },
      ],
      'Address': [
        { type: 'required', message: ' Address  is Required' },
      ],
      'Cnic': [
        { type: 'required', message: ' Cnic  is Required' },
      ],
      'Specialist': [
        { type: 'required', message: ' Specialist  is Required' },
      ]
    };

  constructor(
    public dialogRef: MatDialogRef<DoctorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
      private fb: FormBuilder
      , private appService: AppService
      , private service: doctorService,
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
        Name: ["",[Validators.required]],
        FatherName: ["", [Validators.required]],
        Age: ["", [Validators.required]],
        Cell: ["", [Validators.required]],
        Address: [""],
        Cnic: [""],
        Specialist:[""],
        isActive: true,
       // employeeType: ["",[Validators.required]],
        password: [""],
      });
  }

  //Set Form Values
    setFormValues(obj: IDoctor) {
       
    this.form1.patchValue({
        Id: obj.id,
        Name:  obj.name,
        FatherName:  obj.fatherName,
        Cell:  obj.cell,

        Age: obj.age,
        Address: obj.address,
         Cnic: obj.cnic,
         Specialist: obj.specialist,
         isActive: obj.isActive,
       // password: obj.password

    });
  }

   //Initialiaze Object
    initObject() {
      {
        var obj = {} as IDoctor;
        //default values      
  
        return obj;
      }
    }
    //Get Form Values in Object
    private getValuesIntoObject() {
    
      this.classObj.id = this.form1.get('Id').value;
      this.classObj.name = this.form1.get('Name').value;
      this.classObj.fatherName = this.form1.get('FatherName').value;
      this.classObj.cell= this.form1.get('Cell').value;

      this.classObj.age = this.form1.get('Age').value;
        this.classObj.address = this.form1.get('Address').value;
      this.classObj.cnic = this.form1.get('Cnic').value;
        this.classObj.specialist = this.form1.get('Specialist').value;
        
       this.classObj.isActive = this.form1.get('isActive').value;


      
    }

  //Save Employee
saveDoctor() {
      this.getValuesIntoObject();
      this.service.updateOrInsertDoctor(this.classObj)
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
  if(this.doctorId == null || this.doctorId === 0 )
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
