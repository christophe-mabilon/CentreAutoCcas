import { Injectable, OnInit } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Annonce} from "../interface/annonce.inteface";

@Injectable({
  providedIn: 'root'
})
export class ListeAnnoncesService implements OnInit{
  selectedAnnonce!: Annonce;
    filterStr!: string;
    private apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  add(annonce:Annonce): Observable<Annonce>{
    return this.http.post<Annonce>(this.apiUrl, annonce);
  }

  delete(annonceId: number): Observable<any>{
    return this.http.delete(this.apiUrl + '/'+ annonceId);  }

  update(annonce: Annonce,id:number): Observable<Annonce>{
    return this.http.put<Annonce>(this.apiUrl + '/' + id, annonce);
  }

  findAll(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.apiUrl +'ClassifiedAd/findall');

  }

  findOne(id: number): Observable<Annonce> {
    return this.http.get<Annonce>(this.apiUrl + 'classifiedAd/' + id);
  }
  ngOnInit(): void {
  }

}
