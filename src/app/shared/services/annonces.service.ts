import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment as env} from "../../../environments/environment";
import {Annonce} from "../interface/annonce.inteface";
import {UserService} from "./user.service";
import {FormGroup} from "@angular/forms";
import {catchError} from "rxjs/operators";
import {AnnoncesComponent} from "../../annonces/annonces.component";


@Injectable({
  providedIn: 'root'
})
export class AnnoncesService {
  private apiUrl = env.apiUrl;
  annoncesByUser!: Annonce[];
  reference: any;
  searchForm = new BehaviorSubject('');
  sendForm = this.searchForm.asObservable();
  constructor(private userServ: UserService, private http: HttpClient) {
  }

  setAnnonce(searchValue:any){
    this.searchForm.next(searchValue);

  }
  getsearchForm(){
    return this.searchForm;
  }
  searchAnnonces(annonceSearch:any):Observable<Annonce>{

    return this.http.post<any>(this.apiUrl + 'search' ,annonceSearch);

  }
  add(annonce: any): Observable<Annonce> {
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.post<Annonce>(this.apiUrl + 'classifiedAd/add/', annonce, {headers})

  }

  delete(productId: number): Observable<any> {
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.delete(this.apiUrl +'classifiedAd/delete/'+ productId, {headers});
  }

  update(annonce: Annonce): Observable<Annonce> {
    const headers = {'Authorization': "Bearer " + this.userServ.getToken()};
    return this.http.put<Annonce>(this.apiUrl + '/' + annonce.id, annonce, {headers});
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
    return this.http.get<any>(this.apiUrl + 'classifiedAd/' + id);
  }



}
