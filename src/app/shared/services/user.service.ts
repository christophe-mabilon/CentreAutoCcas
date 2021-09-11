import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
import {environment as env} from "../../../environments/environment";
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {



  private apiUrl = env.apiUrl;
  userId:any;
  private _isLogged: boolean = false;
  private _isAdmin!:boolean;
  private _userInfo: any = [];
  private _refreshToken: any;
  private _username!:string | null ;



  constructor(private http: HttpClient,private router:Router) {
  }
  getCurentUser(): Observable<any> {
    const headers = {'Authorization': "Bearer " + this.getToken()};
    return this.http.get<any>(this.apiUrl + "user/currentUser", {headers});
  }

  showUser(id: any): Observable<any> {
    const headers = {'Authorization': "Bearer " + this.getToken()};
    return this.http.get<any>(this.apiUrl + 'user/show/' + id,{headers});
  }

  newUser( userData: any): Observable<any> {
    const headers = {'Authorization': "Bearer " + this.getToken()};
    return this.http.patch<any>(this.apiUrl + "user/register", userData, {headers});
  }

  updateUser(id: any, userData: any): Observable<any> {
    const headers = {'Authorization': "Bearer " + this.getToken()};
    return this.http.patch<any>(this.apiUrl + "user/edit/" + id, userData, {headers});
  }

  deleteUser(id: any): Observable<any> {
    const headers = {'Authorization': "Bearer " + this.getToken()};
    return this.http.delete<any>(this.apiUrl + 'user/delete/' + id,{headers});
  }

  /*******************************
   Connexion USER
   ******************************/
  loginUser(formLogin:FormGroup) {
    this.http.post(this.apiUrl + "login_check", formLogin.value).subscribe(
      (data: any) => {
        const token: any = jwt_decode(data.token);this.setUsername(token.username);this.setRefreshToken(data.refresh_token);
        this.setToken(data.token);
        sessionStorage.setItem("isLogged", "true");
        sessionStorage.setItem('username',token.username);
        this.setRoles(token);
        this.setIsLogged(true);
        this.getUsername();
        this.getIsLogged()

        if(this.getRoles() === "ROLE_ADMIN"){
         sessionStorage.setItem("isAdmin","true");
         this.getIsAdmin();

          setTimeout(function(){
            window.location.reload();
          }, 200);
          this.router.navigate(['/connectedAdmin']);
        }
        else{
          window.sessionStorage.setItem("isAdmin", "false");
          setTimeout(function(){
            window.location.reload();
          }, 200);
          this.router.navigate(['/connectedUser']);
        }
      });
  }

  /*******************************
   GUETTEUR /SETER USER ID
   *****************************/
  getUserId(): Observable<any> {
    this.userId = sessionStorage.getItem("userId");
    return this.userId;
  }

  setUserId(value: any) {
    this.userId = value;
  }

  /*******************************
   GUETTEUR /SETER USERNAME
   *****************************/
  getUsername(): string {
    this._username = sessionStorage.getItem('username');
    return <string>this._username;
  }
  setUsername(value: string) {
    this._username = value;
  }
  /*******************************
   GUETTEUR /SETER REFRESH TOKEN A FINR
   *****************************/
  setRefreshToken(data: any): Observable<any> {
    return this._refreshToken = data;
  }
  getRefreshToken() {
    return {"refresh_token": this._refreshToken};
  }
  /*******************************
   GUETTEUR /SETER TOKEN
   *****************************/
  setToken(data: any) {
    sessionStorage.setItem("token", data);
  }
  getToken(): any {
    return sessionStorage.getItem("token");
  }
  getNewToken(): Observable<any> {
    let myJsonRefresh = JSON.stringify(this.getRefreshToken())


    return this.http.post<any>(this.apiUrl + "token/refresh", myJsonRefresh)
  }
  /*******************************
   GUETTEUR /SETER ROLES
   *****************************/
  setRoles(data: any) {
    this._userInfo = data;
  }
  getRoles() {
    return this._userInfo.roles[0];
  }
  /*******************************
   GUETTEUR /SETER ADMIN
   *****************************/
  setIsAdmin(value: any) {
    this._isAdmin = value;
  }
  getIsAdmin(){
    if(sessionStorage.getItem("isAdmin") ==="true"){
      this._isAdmin = true;
    }else{
      this._isAdmin =false;
    }
    return this._isAdmin
  }
  /*******************************
   GUETTEUR /SETER ISLOGGED
   *****************************/
  setIsLogged(value:boolean) {
    this._isLogged = !this._isLogged;
  }
  getIsLogged() {
    if (sessionStorage.getItem("isLogged") === "true") {
      this._isLogged = true;
    } else {
      this._isLogged = false;
    }
    return this._isLogged;
  }
  /*******************************
   LOGOUT
   *****************************/
  loggedout() {
    this.setIsLogged(false);
    this.setIsAdmin(false);
    this.setRoles([]);
    this.setToken("");
    this.setRefreshToken("");
    this.setUsername("");
    sessionStorage.clear();
    this.router.navigate(['/home']);
  }


}
