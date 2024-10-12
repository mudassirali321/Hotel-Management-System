import { IOrder } from './../shared/models/IOrders';
import { ITableList } from './../shared/models/ITable-List';

import { throwError as observableThrowError } from 'rxjs';
//// import { Http, Response } from '@angular/http';
//import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { IFormSecurity } from '../shared/models/IFormSecurity'
import { BehaviorSubject } from 'rxjs';
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
import { ICrud } from 'app/shared/models/I_Crud';
// import { IpcNetConnectOpts } from 'net';
@Injectable({
    providedIn: 'root'
})
export class CrudService {
    apiUrl = 'http://localhost:21021/api/services/app/';
    constructor(private _httpClient: HttpClient, private _global: AppService) {
        //  this.reqHeaders = new Headers();
        // this.reqHeaders.append('Content-Type', 'application/json');
        // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });

    }
    private handleError(error: HttpErrorResponse) {
        console.log('===========HTTP ERROR:===========');
        console.log(error);
        //    alert(error.message);
        return observableThrowError(error.error || 'Server error');
      }
InsertCrud(crud:ICrud): Observable<boolean> {
        
        let url = this.apiUrl + '/Crud/CreateCrud';
        return this._httpClient.post<boolean>(url, crud).catch(this.handleError);
      }

}
