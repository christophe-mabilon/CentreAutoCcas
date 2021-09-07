import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Region} from "../interface/region.interface";
import {HttpClient} from "@angular/common/http";
import {Marque} from "../interface/marque.interface";
import {Annonce} from "../interface/annonce.inteface";
import {environment as env} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RegionService {
  private apiUrl = env.apiUrl ;
  public regions: BehaviorSubject<Region[]> = new BehaviorSubject([
    {id:1,name:"Auvergne Rhone Alpes"},
    {id: 2,name:"Bourgogne Franche Comte"},
    {id: 3,name:"Bretagne,Centre Val de Loire"},
    {id: 4,name:"Corse,Grand Est"},
    {id: 5,name:"Hauts de France"},
    {id: 6,name:"Île de France"},
    {id: 7,name:"Normandie"},
    {id: 8,name:"Nouvelle Aquitaine"},
    {id: 9,name:"Occitanie"},
    {id: 10,name:"Pays de la Loire"},
    {id: 11,name:"Provence Alpes Cote d'Azur"},
  ]);
  regionsName = [
    'Auvergne Rhone Alpes',
    'Bourgogne Franche Comte',
    'Bretagne,Centre Val de Loire',
    'Corse,Grand Est',
    'Hauts de France',
    'Île de France',
    'Normandie',
    'Nouvelle Aquitaine',
    'Occitanie',
    'Pays de la Loire',
    "Provence Alpes Cote d'Azur",
  ]
  constructor(private http : HttpClient) { }

  add(region: Region): Observable<Region>{
    return this.http.post<Region>(this.apiUrl, region);
  }

  delete(regionId: number): Observable<any>{
    return this.http.delete(this.apiUrl + '/'+ regionId);  }

  update(region: Region): Observable<Region>{
    return this.http.put<Region>(this.apiUrl + '/' + region.id, region);
  }

  findAll(): Observable<Region[]> {
    return this.http.get<Region[]>(this.apiUrl+'');
  }

  findOne(id: number): Observable<Region> {
    return this.http.get<Region>(this.apiUrl+'' + id);
  }

// a finir
}
