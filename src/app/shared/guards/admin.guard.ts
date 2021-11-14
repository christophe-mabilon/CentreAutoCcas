import { UserService } from './../services/user.service';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate ,OnInit{
  currentUser!: User;
  isAdmin:Boolean = false;
  constructor(private userserv:UserService){



  }
  ngOnInit(): void {
    this.userserv.getCurentUser().subscribe(currentUser=>{
 if(currentUser.roles[0]==='ROLE_ADMIN'){
   this.isAdmin;
 }
    })
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     if(this.isAdmin){
       return true;
     }else{
       return false
     }


  }

}
