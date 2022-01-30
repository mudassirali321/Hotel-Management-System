import { Component, OnInit } from '@angular/core';
import { AppAuthService } from './app-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
submitting=false;
  constructor(public authService: AppAuthService,) { }

  ngOnInit(): void {
  }

   login(): void {
    this.submitting = true;
    this.authService.authenticate(() => (this.submitting = false));
   }
    

}
