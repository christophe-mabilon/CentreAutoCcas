import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment as env} from "../../../environments/environment";
import {Annonce} from "../interface/annonce.inteface";
import {UserService} from "./user.service";



@Injectable({
  providedIn: 'root'
})
export class AnnoncesService implements OnInit{
  private apiUrl = env.apiUrl;
 annoncesByUser!: Annonce[];

  constructor(private userServ:UserService,private http:HttpClient){

  }
  add(annonce: Annonce): Observable<Annonce>{
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.post<Annonce>(this.apiUrl, annonce,{headers});
  }

  delete(productId: number): Observable<any>{
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.delete(this.apiUrl +  productId,{headers});  }

  update(annonce: Annonce): Observable<Annonce>{
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.put<Annonce>(this.apiUrl + '/' + annonce.id, annonce,{headers});
  }

  findAll(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.apiUrl + 'classifiedAd/findall');
  }

  findAllByUser(): Observable<Annonce[]> {
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.get<Annonce[]>(this.apiUrl + 'classifiedAds/user/findall', {headers});
  }

  findAllByBrand(): Observable<Annonce[]> {
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.get<Annonce[]>(this.apiUrl + 'classifiedAds/user/findall/brand', {headers});
  }

  findOne(id: number): Observable<any> {
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.get<any>(this.apiUrl +'classifiedAd/'+ id);
  }

  ngOnInit(): void {



  }

}
