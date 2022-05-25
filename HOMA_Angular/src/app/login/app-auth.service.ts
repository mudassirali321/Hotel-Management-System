import { AuthenticateModel, AuthenticateResultModel, IAuthenticateResultModel, TokenAuthServiceProxy,  } from './../shared/services/service-proxies';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../Services/notification.service';
import { AppService } from 'app/shared/services/app.service';



@Injectable()
export class AppAuthService {
    UserInfo: any;

    authenticateModel: AuthenticateModel;
    authenticateResult: AuthenticateResultModel;
    rememberMe: boolean;

    constructor(
        private _tokenAuthService: TokenAuthServiceProxy,
        private _router: Router,
        private _notificationService: NotificationService,
        private _appService: AppService
       
    )
    {
        this.clear();
    }
    

    authenticate(finallyCallback?: () => void): void {
        debugger;
        finallyCallback = finallyCallback || (() => { });

        this._tokenAuthService
            .authenticate(this.authenticateModel)
            .pipe(
                finalize(() => {
                    finallyCallback();
                })
            )
            .subscribe((result: AuthenticateResultModel) => {
                this.processAuthenticateResult(result);
            });
    }

    public processAuthenticateResult(
        authenticateResult
    ) {
        this.authenticateResult = authenticateResult.result;

        // if (this.authenticateResult.accessToken) {
        //     // Successfully logged i
        //     this.login(
        //         authenticateResult.accessToken,
        //         authenticateResult.encryptedAccessToken,
        //         authenticateResult.expireInSeconds,
        //         this.rememberMe
        //     );
        // } 
         if (this.authenticateResult.accessToken) {
             debugger;
            // Successfully logged i
     
        this._appService.currentUser = this.authenticateResult.user;
         

        

             this.login(
                this.authenticateResult.accessToken,
                this.authenticateResult.encryptedAccessToken,
                this.authenticateResult.expireInSeconds,
                this.rememberMe
            );
         } 

        else {
            // Unexpected result!

          //  this._logService.warn('Unexpected authenticateResult!');
            this._router.navigate(['/login']);
        }
    }

    private login(
        accessToken: string,
        encryptedAccessToken: string,
        expireInSeconds: number,
        rememberMe?: boolean
    ): void {
        const tokenExpireDate = rememberMe
            ? new Date(new Date().getTime() + 1000 * expireInSeconds)
            : undefined;
        localStorage.setItem('auth_token', accessToken);
       

        
        this._notificationService.success('Successfully Log In');
        // localStorage.setItem('tokenExpireDate',tokenExpireDate );
        
        this._router.navigate(['/dashboard']);
        //this._tokenService.setToken(accessToken, tokenExpireDate);
        
    }
    
    private clear(): void {
        this.authenticateModel = new AuthenticateModel();
        this.authenticateModel.rememberClient = false;
        this.authenticateResult = null;
        this.rememberMe = false;
    }
}
