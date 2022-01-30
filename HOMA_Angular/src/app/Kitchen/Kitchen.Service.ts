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
// import { IpcNetConnectOpts } from 'net';
@Injectable({
    providedIn: 'root'
})
export class KitchenService {
    apiUrl = 'http://localhost:21021/api/services/app/';
    constructor(private _httpClient: HttpClient, private _global: AppService) {
        //  this.reqHeaders = new Headers();
        // this.reqHeaders.append('Content-Type', 'application/json');
        // this.reqOptions = new RequestOptions({ headers: this.reqHeaders });

    }
    //get Today Active Orders
    getTodayActiveOrders(): Observable<IOrder[]> { //IOrder[]
        let url: string = this.apiUrl + 'OrderService/getTadayActiveOrders';
        return this._httpClient.get<any>(url).catch(this.handleError);
    }

   // Get Today Successfully Closed Orders
    getTodaySuccessfullyClosedOrders(): Observable<IOrder[]> { //IOrder[] 
        let url: string = this.apiUrl + 'OrderService/getAllTodaySuccessfullyClosedOrders';
        return this._httpClient.get<any>(url).catch(this.handleError);
    }

   // Get Taday Orders WithOut Process Orders
    getTodayWithoutProcessOrders(): Observable<IOrder[]> { //IOrder[]

        let url: string = this.apiUrl + 'OrderService/getAllTodayWithoutProcessOrders';
        return this._httpClient.get<any>(url).catch(this.handleError);
    }


  //  Get Today Revenue
    getTodayRevenue(): Observable<number> { //IOrder[]
        let url: string = this.apiUrl + 'OrderService/getTadayRevenue';
        return this._httpClient.get<number>(url).catch(this.handleError);
    }

//Get All Today Total Orders
    getAllTodayTotalOrders(): Observable<IOrder[]> { //IOrder[]
        
        let url: string = this.apiUrl + 'OrderService/getAllTodayOpenAndClosedOrder';
        return this._httpClient.get<any>(url).catch(this.handleError);
    }

//Get Order Details On Order Id
    getOrderDetailOnId(orderId: number): Observable<any> { //IOrder[]

        let url: string = this.apiUrl + 'OrderService/getOrderDetailOnOrderId?orderId=' + orderId;

        return this._httpClient.get<any[]>(url).catch(this.handleError);
    }


    getFormSeucirty(frmName: string): Observable<IFormSecurity> {
        debugger;
        let url: string = this.apiUrl + 'PayDesignation/GetFormSecurity?formName=' + frmName;
        return this._httpClient.get<IFormSecurity>(url).catch(this.handleError);
    }
    private handleError(error: HttpErrorResponse) {
        console.log('===========HTTP ERROR:===========');
        console.log(error);
        //    alert(error.message);
        return observableThrowError(error.error || 'Server error');
    }


    // Update Order Status
    updateOrderStatus(orderId: number, orderStatus: string): Observable<boolean> {
        let url = this.apiUrl + 'OrderService/updateOrderStatus?orderId=' + orderId + '&orderStatus=' + orderStatus;
        return this._httpClient.post<boolean>(url, {}).catch(this.handleError);
    }
    updateTable(tableList: ITableList): Observable<boolean> {
        let url = this.apiUrl + 'PayDesignation/postDesignation';
        return this._httpClient.post<boolean>(url, tableList).catch(this.handleError);
    }


    //deleteTable(tableList: ITableList): Observable<boolean> {
    //    let url = this.apiUrl + 'PayDesignation/Delete';
    //    return this._httpClient.post<boolean>(url, tableList).catch(this.handleError);
    //}


}
