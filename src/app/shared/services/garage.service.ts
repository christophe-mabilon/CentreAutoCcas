import {Injectable, OnInit} from '@angular/core';
import { Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment as env} from "../../../environments/environment";
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

  add(garage:Garage): Observable<any>{
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.post<Garage>(this.apiUrl+'garage/add/'+ garage.userId , garage, {headers});
  }

  delete(garageId: number): Observable<any>{
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.delete(this.apiUrl + 'garage/delete/' + garageId,{headers});  }

  update(garage: Garage, garageId: number): Observable<Garage>{
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.patch<Garage>(this.apiUrl +'garage/update/'+ garageId, garage,{headers});
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
