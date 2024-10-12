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
// import { IpcNetConnectOpts } from 'net';
@Injectable({
  providedIn: 'root'
})
export class patient1Service {
  apiUrl = 'http://localhost:21021/api/services/app/';
  constructor(private _httpClient: HttpClient, private _global: AppService) {
    //  this.reqHeaders = new Headers();
    // this.reqHeaders.append('Content-Type', 'application/json');
    // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });


  } 
//Get All Employee

    getAllPatients(): Observable<Ipatient1[]> {//Ipatient1[]
    
    let url: string = this.apiUrl + 'Patient1Service/getAllPatient1' ;
        return this._httpClient.get<Ipatient1[]>(url).catch(this.handleError);
  }
  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    console.log(error);
    //    alert(error.message);
    return observableThrowError(error.error || 'Server error');
  }
//Update Employee
  updateOrInsertPatient1(Patient:Ipatient1): Observable<boolean> {
    debugger;
    let url = this.apiUrl + 'Patient1Service/UpdatePatient1';
    return this._httpClient.post<boolean>(url, Patient).catch(this.handleError);
  }
//Delete Employee
  deletePatient1(patient1Id: number):Observable<boolean>{
    let url = this.apiUrl + 'Patient1Service/deletePatient1?Id='+patient1Id;
    return this._httpClient.delete<boolean>(url).catch(this.handleError);
  }

}
