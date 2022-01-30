import { AuthenticateModel, AuthenticateResultModel, IAuthenticateResultModel, TokenAuthServiceProxy,  } from './../shared/services/service-proxies';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { NotificationService } from '../Services/notification.service';



@Injectable()
export class AppAuthService {
    authenticateModel: AuthenticateModel;
    authenticateResult: AuthenticateResultModel;
    rememberMe: boolean;

    constructor(
        private _tokenAuthService: TokenAuthServiceProxy,
        private _router: Router,
        private _notificationService: NotificationService
       
    )
    {
        this.clear();
    }


    authenticate(finallyCallback?: () => void): void {
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

    private processAuthenticateResult(
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
            // Successfully logged i
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
        debugger;
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
