import { IDisease } from '../../shared/models/I_Disease';
import { NotificationService } from '../../Services/notification.service';
import { diseaseService } from '../disease.service';
import { Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../../shared/services/app.service';
@Component({
  selector: 'app-disease-dialog',
  templateUrl: './disease-dialog.component.html',
  styleUrls: ['./disease-dialog.component.scss'],
})
export class DiseaseDialogComponent implements OnInit {
    requestResult: any = null;
    diseaseId: number;
    itemPhoto: File;  
    fileToUpload: FileList;
    imageUrl: File ;  //Upload Image Url
    isEditMode: boolean;
    form1: FormGroup;
    title : string;
    classObj: IDisease ;
    empTypes = [];

    validation_messages = {
 
      'Title': [
        { type: 'required', message: ' Name  is Required' },
      ],
      'Symptoms': [
        { type: 'required', message: ' Father Name  is Required' },
      ]
    };

  constructor(
    public dialogRef: MatDialogRef<DiseaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
      private fb: FormBuilder
      , private appService: AppService
      , private service: diseaseService,
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
  chk_change(){

    alert('');
  }


  createForm(){
    this.form1 = this.fb.group({
        Id: [{value:null, disabled: true},],
        Title: ["",[Validators.required]],
        Symptoms: ["", [Validators.required]],
        isActive: [true],
       // employeeType: ["",[Validators.required]],
      });
  }

  //Set Form Values
    setFormValues(obj: IDisease) {
       
    this.form1.patchValue({
        Id: obj.id,
        Title:  obj.title,
        Symptoms:  obj.symptoms,
         isActive: obj.isActive,
       // password: obj.password

    });
  }

   //Initialiaze Object
    initObject() {
      {
        var obj = {} as IDisease;
        //default values      
  
        return obj;
      }
    }
    //Get Form Values in Object
    private getValuesIntoObject() {
    
      this.classObj.id = this.form1.get('Id').value;
      this.classObj.title = this.form1.get('Title').value;
      this.classObj.symptoms = this.form1.get('Symptoms').value;
       this.classObj.isActive = this.form1.get('isActive').value;


      
    }

  //Save Employee
saveDisease() {
      this.getValuesIntoObject();
      this.service.updateOrInsertDisease(this.classObj)
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
  if(this.diseaseId == null || this.diseaseId === 0 )
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
