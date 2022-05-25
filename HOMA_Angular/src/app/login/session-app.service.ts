import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from 'app/shared/services/app.service';
import { Observable } from 'rxjs';
import { throwError as observableThrowError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionAppService {
  apiUrl = 'http://localhost:21021/api/services/app/';

  constructor(private _httpClient: HttpClient, private _global: AppService) { } 

  //Get All Employee
  getRoll(): Observable<any> {
    
    let url: string = this.apiUrl + 'SessionAppService/GetCurrentLoginInformations' ;
        return this._httpClient.get<any>(url).catch(this.handleError);
  }

  private handleError(error: HttpErrorResponse) {
    console.log('===========HTTP ERROR:===========');
    console.log(error);
    //    alert(error.message);
    return observableThrowError(error.error || 'Server error');
  }
}
