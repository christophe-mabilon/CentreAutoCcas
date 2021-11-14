import { Marque } from '../interface/marque.interface';
import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {environment as env} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class MarqueService {
  emitterr  = new EventEmitter();
  private apiUrl = env.apiUrl ;
  public marques: BehaviorSubject<Marque[]> = new BehaviorSubject([
    {id: 1,name: "ALFA ROMEO", img: "../../assets/logo/logo-Alfa-Romeo.png", description: "logo-Alfa-Romeo",countBrandAnnounce:0},
    {id: 2,name: "ASTON MARTIN", img: "../../assets/logo/logo-Aston-Martin.png", description: "logo-Aston-Martin",countBrandAnnounce:0},
    {id: 3,name: "AUDI", img: "../../assets/logo/logo-audi.png", description: "logo-audi",countBrandAnnounce:0},
    {id: 4,name: "BENTLEY", img: "../../assets/logo/logo-Bentley.png", description: "logo-Bentley",countBrandAnnounce:0},
    {id: 5,name: "BMW", img: "../../assets/logo/logo-bmw.png", description: "logo-BMW",countBrandAnnounce:0},
    {id: 6,name: "CHEVROLET", img: "../../assets/logo/logo-Chevrolet.png", description: "logo-Chevrolet.png",countBrandAnnounce:0},
    {id: 7,name: "CHRYSLER", img: "../../assets/logo/logo-chrysler.png", description: "logo-chrysler",countBrandAnnounce:0},
    {id: 8,name: "CITROËN", img: "../../assets/logo/logo-Citroen.png", description: "logo-Citroen",countBrandAnnounce:0},
    {id: 9,name: "DACIA", img: "../../assets/logo/logo-dacia.png", description: "logo-dacia",countBrandAnnounce:0},
    {id: 10,name: "DAEWOO", img: "../../assets/logo/logo-Daewoo.png", description: "logo-Daewoo",countBrandAnnounce:0},
    {id: 11,name: "DS AUTO", img: "../../assets/logo/logo-DS-Automobiles.png", description: "logo-DS-Automobiles",countBrandAnnounce:0},
    {id: 12,name: "FERRARI", img: "../../assets/logo/logo-ferrari.png", description: "logo-ferrari",countBrandAnnounce:0},
    {id: 13,name: "FIAT", img: "../../assets/logo/logo-fiat.png", description: "logo-fiat",countBrandAnnounce:0},
    {id: 14,name: "FORD", img: "../../assets/logo/logo-Ford.png", description: "logo-Ford",countBrandAnnounce:0},
    {id: 15,name: "HONDA", img: "../../assets/logo/logo-honda.png", description: "logo-honda",countBrandAnnounce:0},
    {id: 16,name: "HYUNDAI", img: "../../assets/logo/logo-hyundai.png", description: "logo-hyundai",countBrandAnnounce:0},
    {id: 17,name: "JAGUAR", img: "../../assets/logo/logo-jaguar.png", description: "logo-jaguar",countBrandAnnounce:0},
    {id: 18,name: "JEEP", img: "../../assets/logo/logo-jeep.png", description: "logo-jeep",countBrandAnnounce:0},
    {id: 19,name: "KIA", img: "../../assets/logo/logo-kia.png", description: "logo-kia",countBrandAnnounce:0},
    {id: 20,name: "MASERATI", img: "../../assets/logo/logo-Maserati.png", description: "logo-Maserati",countBrandAnnounce:0},
    {id: 21,name: "MAZDA", img: "../../assets/logo/logo-mazda.png", description: "logo-mazda",countBrandAnnounce:0},
    {id: 22,name: "MERCEDES", img: "../../assets/logo/logo-mercedes.png", description: "logo-mercedes",countBrandAnnounce:0},
    {id: 23,name: "MINI", img: "../../assets/logo/logo-Mini.png", description: "logo-Mini.png",countBrandAnnounce:0},
    {id: 24,name: "NISSAN", img: "../../assets/logo/logo-Nissan.png", description: "logo-Nissan",countBrandAnnounce:0},
    {id: 25,name: "OPEL", img: "../../assets/logo/logo-opel.png", description: "logo-opel",countBrandAnnounce:0},
    {id: 26,name: "PEUGEOT", img: "../../assets/logo/logo-Peugeot.png", description: "logo-Peugeot",countBrandAnnounce:0},
    {id: 27,name: "PORSHE", img: "../../assets/logo/logo-Porsche.png", description: "logo-Porsche",countBrandAnnounce:0},
    {id: 28,name: "RENAULT", img: "../../assets/logo/logo-renault.png", description: "logo-renault",countBrandAnnounce:0},
    {id: 29,name: "SEAT", img: "../../assets/logo/logo-seat.png", description: "logo-seat",countBrandAnnounce:0},
    {id: 30,name: "ŠKODA", img: "../../assets/logo/logo-skoda.png", description: "logo-skoda",countBrandAnnounce:0},
    {id: 31,name: "SUBARU", img: "../../assets/logo/logo-subaru.png", description: "logo-subaru",countBrandAnnounce:0},
    {id: 32,name: "SUZUKI", img: "../../assets/logo/logo-suzuki.png", description: "logo-suzuki",countBrandAnnounce:0},
    {id: 33,name: "TESLA", img: "../../assets/logo/logo-tesla.png", description: "logo-tesla",countBrandAnnounce:0},
    {id: 34,name: "TOYOTA", img: "../../assets/logo/logo-toyota.png", description: "logo-toyota",countBrandAnnounce:0},
    {id: 35,name: "VOLKSWAGEN", img: "../../assets/logo/logo-Volkswagen.png", description: "logo-Volkswagen",countBrandAnnounce:0},
    {id: 36,name: "VOLVO", img: "../../assets/logo/logo-Volvo.png", description: "logo-Volvo",countBrandAnnounce:0},
  ]);
  marque = [
    'ALFA ROMEO',
    'ASTON MARTIN',
    'AUDI',
    'BENTLEY',
    'BMW',
    'CHEVROLET',
    'CHRYSLER',
    'CITROËN',
    'DACIA',
    'DAEWOO',
    'DS AUTO',
    'FERRARI',
    'FIAT',
    'FORD',
    'HONDA',
    'HYUNDAI',
    'JAGUAR',
    'JEEP',
    'KIA',
    'MASERATI',
    'MAZDA',
    'MERCEDES',
    'MINI',
    'NISSAN',
    'OPEL',
    'PEUGEOT',
    'PORSHE',
    'RENAULT',
    'SEAT',
    'ŠKODA',
    'SUBARU',
    'SUZUKI',
    'TESLA',
    'TOYOTA',
    'VOLKSWAGEN',
    'VOLVO',
  ]

  constructor(private http : HttpClient) { }

  add(marque: Marque): Observable<Marque>{
    return this.http.post<Marque>(this.apiUrl, marque);
  }

  delete(marqueId: number): Observable<any>{
    return this.http.delete(this.apiUrl + '/'+ marqueId);  }

  update(marque: Marque): Observable<Marque>{
    return this.http.put<Marque>(this.apiUrl + '/' + marque.id, marque);
  }

  findAll(): Observable<Marque[]> {
    return this.http.get<Marque[]>(this.apiUrl+'');
  }

  findOne(id: number): Observable<Marque> {
    return this.http.get<Marque>(this.apiUrl + id);
  }
  countAnnoucesByBrand(): Observable<any>{
    return this.http.get<any>(this.apiUrl+'' + 'classifiedAds/count/brand');
  }
  getAll(){
    return this.marques;
  }


  clickEvent(): void{
    this.emitterr.emit();
  }

}
