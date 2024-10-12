import { IEmployee } from './../shared/models/IEmployee';
import { ITableList } from './../shared/models/ITable-List';

import { throwError as observableThrowError } from 'rxjs';
//// import { Http, Response } from '@angular/http';
//import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import {IFormSecurity} from '../shared/models/IFormSecurity'
import {  BehaviorSubject} from 'rxjs';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { resolve } from 'q';
import { AppService } from '../shared/services/app.service';

import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
//import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Ipatient1 } from 'app/shared/models/I_patient1';
import { IDoctor } from 'app/shared/models/I_Doctor';
// import { IpcNetConnectOpts } from 'net';
@Injectable({
  providedIn: 'root'
})
export class doctorService {
  apiUrl = 'http://localhost:21021/api/services/app/';
  constructor(private _httpClient: HttpClient, private _global: AppService) {
    //  this.reqHeaders = new Headers();
    // this.reqHeaders.append('Content-Type', 'application/json');
    // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });


  } 
//Get All Employee

    getAllDoctors(): Observable<IDoctor[]> {//IDoctor[]
    
    let url: string = this.apiUrl + 'DoctorService/getAllDoctor' ;
        return this._httpClient.get<IDoctor[]>(url).catch(this.handleError);
  }
  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    console.log(error);
    //    alert(error.message);
    return observableThrowError(error.error || 'Server error');
  }
//Update Employee
  updateOrInsertDoctor(doctor:IDoctor): Observable<boolean> {
    debugger;
    let url = this.apiUrl + 'DoctorService/UpdateAndInsertDoctor';
    return this._httpClient.post<boolean>(url, doctor).catch(this.handleError);
  }
//Delete Employee
  deleteDoctor(DoctorId: number):Observable<boolean>{
    let url = this.apiUrl + 'DoctorService/deleteDoctor?Id='+DoctorId;
    return this._httpClient.delete<boolean>(url).catch(this.handleError);
  }

}
