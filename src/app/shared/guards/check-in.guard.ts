import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckInGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const pinCode = localStorage.getItem('pinCode');
    const checkIn = localStorage.getItem('checkIn');
    const isTakeBreak = JSON.parse(localStorage.getItem('isTakeTime'));
    if(checkIn || !isTakeBreak) {
      return true;
    } else {
      this.router.navigate(['check-attendance']);
      return false;
    }

  }
  
}
