import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType
} from '@angular/common/http';
import {environment as env} from "../../../environments/environment";
import {UserService} from "./user.service";
import * as http from "@angular/common/http";
import {FormBuilder} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  photos!: File;
  private apiUrl = env.apiUrl;

  constructor(private http: HttpClient, private userServ: UserService) {
  }


  sendPhotos(photos: any): Observable<any> {
    const headers = {'Authorization':  this.userServ.getToken()};
    return this.http.post<File>(this.apiUrl + 'photos', photos, {headers});

  }
}
