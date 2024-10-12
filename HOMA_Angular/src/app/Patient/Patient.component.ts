import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ipatient1 } from 'app/shared/models/I_patient1';
import { IPatient } from 'app/shared/models/I_patient';
import { PatientService } from './Patient.service';
import { IEmployee } from 'app/shared/models/IEmployee';


@Component({
  selector: 'app-Patient',
  templateUrl: './Patient.component.html',
  styleUrls: ['./Patient.component.scss']
})
export class PatientComponent implements OnInit {
  form1: FormGroup;
  classObj: IPatient = null;
  requestResult: any = null;
  service: any;
  data=[];
validation_messages = {
  PatientName: [
    { type: 'required', message: ' PatientName is required' },
  ],
  FatherName: [
    { type: 'required', message: 'FatherName is required' },
  ],
  Cell: [
    { type: 'required', message: 'Cell is required' },

  ],
  Age: [
    { type: 'required', message: 'Age is required' },
  ],
  Address: [
    { type: 'required', message: 'Address is required' },
  ],
  Cnic: [
    { type: 'required', message: 'CNIC is required' },
    { type: 'minlength', message: 'CNIC Contain atleast 13 Digits ' },
  ],
  Disease: [
    { type: 'required', message: 'Disease is required' },
  ],

};
  constructor(private fb: FormBuilder,public dialog: MatDialog,private _PatientService :PatientService) { }

  ngOnInit() : void  {
    this.buildForm();
 this.getAllPatients();
  }
  public buildForm() {
    this.form1 = this.fb.group({
      PatientName: ['', [Validators.required]],
      FatherName: ['', [Validators.required]],
      Cell: ['', [Validators.required]],
      Age: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Disease: ['', [Validators.required]],
      Cnic: ['', [Validators.required, Validators.minLength(13),]],
    });
  }
  setFormValues(obj: IPatient) {
       
    this.form1.patchValue({
      PatientName: obj.PatientName,
        FatherName:  obj.FatherName,
        Cell:  obj.Cell,
        Age:  obj.Age,
        Address: obj.Address,
        Disease: obj.Disease,
        Cnic: obj.Cnic,

    });
  }

  private getValuesIntoObject() {
    
    this.classObj.PatientName = this.form1.get('PatientName').value;
    this.classObj.FatherName = this.form1.get('FatherName').value;
    this.classObj.Cell = this.form1.get('Cell').value;

    this.classObj.Age = this.form1.get('Age').value;
      this.classObj.Address = this.form1.get('Address').value;
    this.classObj.Cnic = this.form1.get('Cnic').value;
      this.classObj.Disease = this.form1.get('Disease').value;
      
    
  }

getAllPatients(){

this._PatientService.getAllPatients().subscribe(x =>{

  // console.log (x)
  this.data = x.result;
} )

}

  savePatient() {
this.getValuesIntoObject()
 this._PatientService.updateOrInsertEmployee(this.classObj).subscribe(x=>{

 })
  }
  loadPatients(){
this.getAllPatients();
  }


}
