import {Injectable, OnInit} from '@angular/core';
import { Observable} from "rxjs";
import {HttpClient, HttpEvent} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
import {User} from "../interface/user.interface";
import {Garage} from "../interface/garage.interface";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class GarageService implements OnInit{
  private apiUrl = env.apiUrl ;
  private headers:any;

  constructor(private http : HttpClient,private userServ:UserService) { }
  //Ajout d'une annonce par le propietaire ou l'admin

  add(userId:User): Observable<any>{
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.post<any>(this.apiUrl+'/garage/add/' +  userId , {headers});
  }

  delete(garageId: number): Observable<any>{
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.delete(this.apiUrl + '/'+ garageId,{headers});  }

  update(garage: Garage): Observable<Garage>{
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.put<Garage>(this.apiUrl + '/' + garage.id, garage,{headers});
  }

  findAll(): Observable<any[]> {
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.get<any[]>(this.apiUrl + 'garages/',{headers});
  }
  findAllByUser(): Observable<any[]> {
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.get<any[]>(this.apiUrl + 'garages/',{headers});
  }

  findOne(id: number): Observable<Garage>{
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.get<Garage>(this.apiUrl + "garage/show/"+ id,{headers})
  }

  ngOnInit(): void {

  }

}
