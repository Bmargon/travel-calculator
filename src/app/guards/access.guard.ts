import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AccessGuar  {

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.router.navigateByUrl('/singIn');
      return false;
    }
  }
}
