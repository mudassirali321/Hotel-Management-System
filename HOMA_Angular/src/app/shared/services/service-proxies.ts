

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

import * as moment from 'moment';

export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
export class AuthenticateModel implements IAuthenticateModel {
    userNameOrEmailAddress: string | undefined;
    password: string | undefined;
    rememberClient: boolean;

    constructor(data?: IAuthenticateModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.userNameOrEmailAddress = data["userNameOrEmailAddress"];
            this.password = data["password"];
            this.rememberClient = data["rememberClient"];
        }
    }

    static fromJS(data: any): AuthenticateModel {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticateModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["userNameOrEmailAddress"] = this.userNameOrEmailAddress;
        data["password"] = this.password;
        data["rememberClient"] = this.rememberClient;
        return data; 
    }

    clone(): AuthenticateModel {
        const json = this.toJSON();
        let result = new AuthenticateModel();
        result.init(json);
        return result;
    }
}

export interface IAuthenticateModel {
    userNameOrEmailAddress: string | undefined;
    password: string | undefined;
    rememberClient: boolean;
}


export interface IAuthenticateResultModel {
    accessToken: string | undefined;
    encryptedAccessToken: string | undefined;
    expireInSeconds: number;
    userId: number;
}

export class AuthenticateResultModel implements IAuthenticateResultModel {
    accessToken: string | undefined;
    encryptedAccessToken: string | undefined;
    expireInSeconds: number;
    userId: number;

    constructor(data?: IAuthenticateResultModel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.accessToken = data["accessToken"];
            this.encryptedAccessToken = data["encryptedAccessToken"];
            this.expireInSeconds = data["expireInSeconds"];
            this.userId = data["userId"];
        }
    }

    static fromJS(data: any): AuthenticateResultModel {
        data = typeof data === 'object' ? data : {};
        let result = new AuthenticateResultModel();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["accessToken"] = this.accessToken;
        data["encryptedAccessToken"] = this.encryptedAccessToken;
        data["expireInSeconds"] = this.expireInSeconds;
        data["userId"] = this.userId;
        return data; 
    }

    clone(): AuthenticateResultModel {
        const json = this.toJSON();
        let result = new AuthenticateResultModel();
        result.init(json);
        return result;
    }
}

export interface IAuthenticateResultModel {
    accessToken: string | undefined;
    encryptedAccessToken: string | undefined;
    expireInSeconds: number;
    userId: number;
}


@Injectable()
export class TokenAuthServiceProxy {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(API_BASE_URL) baseUrl?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : "";
    }

    authenticate(body: AuthenticateModel | undefined): Observable<AuthenticateResultModel> {
        let apiUrl = "http://localhost:21021";
        let url_ = apiUrl + "/api/TokenAuth/Authenticate";
        return this.http.post<AuthenticateResultModel>(url_, body);
            
    }

    
}
   

