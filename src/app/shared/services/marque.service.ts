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
    {id: 1,name: "ALFA ROMEO", img: "../../assets/logo/logo-Alfa-Romeo.png", description: "logo-Alfa-Romeo"},
    {id: 2,name: "ASTON MARTIN", img: "../../assets/logo/logo-Aston-Martin.png", description: "logo-Aston-Martin"},
    {id: 3,name: "AUDI", img: "../../assets/logo/logo-audi.png", description: "logo-audi"},
    {id: 4,name: "BENTLEY", img: "../../assets/logo/logo-Bentley.png", description: "logo-Bentley"},
    {id: 5,name: "BMW", img: "../../assets/logo/logo-bmw.png", description: "logo-BMW"},
    {id: 6,name: "HEVROLET", img: "../../assets/logo/logo-Chevrolet.png", description: "logo-Chevrolet.png"},
    {id: 7,name: "CHRYSLER", img: "../../assets/logo/logo-chrysler.png", description: "logo-chrysler"},
    {id: 8,name: "CITROËN", img: "../../assets/logo/logo-Citroen.png", description: "logo-Citroen"},
    {id: 9,name: "DACIA", img: "../../assets/logo/logo-dacia.png", description: "logo-dacia"},
    {id: 10,name: "DAEWOO", img: "../../assets/logo/logo-Daewoo.png", description: "logo-Daewoo"},
    {id: 11,name: "DS AUTO", img: "../../assets/logo/logo-DS-Automobiles.png", description: "logo-DS-Automobiles"},
    {id: 12,name: "FERRARI", img: "../../assets/logo/logo-ferrari.png", description: "logo-ferrari"},
    {id: 13,name: "FIAT", img: "../../assets/logo/logo-fiat.png", description: "logo-fiat"},
    {id: 14,name: "FORD", img: "../../assets/logo/logo-Ford.png", description: "logo-Ford"},
    {id: 15,name: "HONDA", img: "../../assets/logo/logo-honda.png", description: "logo-honda"},
    {id: 16,name: "HYUNDAI", img: "../../assets/logo/logo-hyundai.png", description: "logo-hyundai"},
    {id: 17,name: "JAGUAR", img: "../../assets/logo/logo-jaguar.png", description: "logo-jaguar"},
    {id: 18,name: "JEEP", img: "../../assets/logo/logo-jeep.png", description: "logo-jeep"},
    {id: 19,name: "KIA", img: "../../assets/logo/logo-kia.png", description: "logo-kia"},
    {id: 20,name: "MASERATI", img: "../../assets/logo/logo-Maserati.png", description: "logo-Maserati"},
    {id: 21,name: "MAZDA", img: "../../assets/logo/logo-mazda.png", description: "logo-mazda"},
    {id: 22,name: "MERCEDES", img: "../../assets/logo/logo-mercedes.png", description: "logo-mercedes"},
    {id: 23,name: "MINI", img: "../../assets/logo/logo-Mini.png", description: "logo-Mini.png"},
    {id: 24,name: "NISSAN", img: "../../assets/logo/logo-Nissan.png", description: "logo-Nissan"},
    {id: 25,name: "OPEL", img: "../../assets/logo/logo-opel.png", description: "logo-opel"},
    {id: 26,name: "PEUGEOT", img: "../../assets/logo/logo-Peugeot.png", description: "logo-Peugeot"},
    {id: 27,name: "PORSHE", img: "../../assets/logo/logo-Porsche.png", description: "logo-Porsche"},
    {id: 28,name: "RENAULT", img: "../../assets/logo/logo-renault.png", description: "logo-renault"},
    {id: 29,name: "SEAT", img: "../../assets/logo/logo-seat.png", description: "logo-seat"},
    {id: 30,name: "ŠKODA", img: "../../assets/logo/logo-skoda.png", description: "logo-skoda"},
    {id: 31,name: "SUBARU", img: "../../assets/logo/logo-subaru.png", description: "logo-subaru"},
    {id: 32,name: "SUZUKI", img: "../../assets/logo/logo-suzuki.png", description: "logo-suzuki"},
    {id: 33,name: "TESLA", img: "../../assets/logo/logo-tesla.png", description: "logo-tesla"},
    {id: 34,name: "TOYOTA", img: "../../assets/logo/logo-toyota.png", description: "logo-toyota"},
    {id: 35,name: "VOLKSWAGEN", img: "../../assets/logo/logo-Volkswagen.png", description: "logo-Volkswagen"},
    {id: 36,name: "VOLVO", img: "../../assets/logo/logo-Volvo.png", description: "logo-Volvo"}
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
    return this.http.get<Marque>(this.apiUrl+'' + id);
  }

  getAll(){
    return this.marques;
  }

  clickMoreLess(number:number){


  }
  clickEvent(): void{
    this.emitterr.emit();
  }

}
