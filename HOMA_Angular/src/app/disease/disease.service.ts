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
import { IDisease } from 'app/shared/models/I_Disease';
// import { IpcNetConnectOpts } from 'net';
@Injectable({
  providedIn: 'root'
})
export class diseaseService {
  apiUrl = 'http://localhost:21021/api/services/app/';
  constructor(private _httpClient: HttpClient, private _global: AppService) {
    //  this.reqHeaders = new Headers();
    // this.reqHeaders.append('Content-Type', 'application/json');
    // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });


  } 
//Get All Employee

    getAllDiseases(): Observable<IDisease[]> {//IDisease[]
    
    let url: string = this.apiUrl + 'DiseaseService/getAllDisease' ;
        return this._httpClient.get<IDisease[]>(url).catch(this.handleError);
  }
  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    console.log(error);
    //    alert(error.message);
    return observableThrowError(error.error || 'Server error');
  }
//Update Employee
  updateOrInsertDisease(disease:IDisease): Observable<boolean> {
    debugger;
    let url = this.apiUrl + 'DiseaseService/UpdateAndInsertDisease';
    return this._httpClient.post<boolean>(url, disease).catch(this.handleError);
  }
//Delete Employee
  deleteDisease(DiseaseId: number):Observable<boolean>{
    let url = this.apiUrl + 'DiseaseService/deleteDisease?Id='+DiseaseId;
    return this._httpClient.delete<boolean>(url).catch(this.handleError);
  }

}