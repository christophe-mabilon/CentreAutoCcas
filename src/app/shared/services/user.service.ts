import { User } from './../interface/user.interface';
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment as env} from "../../../environments/environment";
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = env.apiUrl;
  currentUser = new Observable<User>();
  userId:any;
  private _isLogged: boolean = false;
  private _isAdmin:boolean | undefined ;
  private _refreshToken: any;
  private _username!:string ;



  constructor(private http: HttpClient,private router:Router) {

  }
  getCurentUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl + "user/currentUser");
  }
  RefreshToken(): Observable<any> {
    const headers = {'Authorization': "Bearer " + this.getRefreshToken()};
    return this.http.post<any>(this.apiUrl + "/token/refresh", {headers});
  }
  findAllUsers(){
    const headers = {'Authorization': "Bearer " + this.getToken()};
    return this.http.get(this.apiUrl + 'user/searchAll', {headers});
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

connected(formLogin: FormGroup){
  this.loginUser(formLogin).subscribe(
    (data: any) => {
      const token: any = jwt_decode(data.token);
      this.setUsername(token.username);
      this.setRefreshToken(data.refresh_token);
        this.setToken(data.token);
      this.setRefreshToken(data.refresh_token)
      this.getCurentUser().subscribe(user=>{
        this.currentUser = user;
        localStorage.setItem('userId',user.id);
        localStorage.setItem('role',token.roles[0]);
        localStorage.setItem('username',token.username);
        localStorage.setItem('isLogged','true');
        this._isLogged = true;
        window.sessionStorage.setItem("isAdmin", "false");
      if(token.roles[0] === "ROLE_ADMIN"){
        this._isAdmin = this.setIsAdmin(true);
        this.router.navigate(['/connectedAdmin']);
      }
      else{
        this._isAdmin = false;
       localStorage.setItem("isAdmin", "false");

        this.router.navigate(['/connectedUser']);
      }
    })
} )
}

loginUser(formLogin:FormGroup): Observable<any> {
    return this.http.post(this.apiUrl + "login_check", formLogin.value);
  }


  /*******************************
   GUETTEUR /SETER USER ID
   *****************************/
  getUserId(): Observable<any> {
    this.userId = localStorage.getItem("userId");
    return this.userId;
  }

  setUserId(value: any) {
    this.userId = value;
  }

  /*******************************
   GUETTEUR /SETER USERNAME
   *****************************/
  getUsername(): string {
    return this._username;
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
    localStorage.setItem("token", data);
  }
  getToken(): any {
    return localStorage.getItem("token");
  }
  getNewToken(): Observable<any> {
    let myJsonRefresh = JSON.stringify(this.getRefreshToken());
    return this.http.post<any>(this.apiUrl + "token/refresh", myJsonRefresh)
  }
  /*******************************
   GUETTEUR /SETER ROLES
   *****************************/
  setRoles(roles: any) {
    return roles;
  }
  getRoles(roles:any) {
    return roles;
  }
  /*******************************
   GUETTEUR /SETER ADMIN
   *****************************/
  setIsAdmin(value: boolean):boolean{
    return this._isAdmin = value;
  }
  getIsAdmin(){
    return this._isAdmin
  }
  /*******************************
   GUETTEUR /SETER ISLOGGED
   *****************************/
  setIsLogged(value:boolean) {
    this._isLogged = !this._isLogged;
  }
  getIsLogged() {
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
    localStorage.clear();
    sessionStorage.clear()
    this.router.navigate(['/home']);
  }


}
