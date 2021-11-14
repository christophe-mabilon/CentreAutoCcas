import {Component, EventEmitter, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../shared/services/user.service";
import {environment as env} from "../../../../environments/environment";
import {error} from "@angular/compiler/src/util";


@Component({
  selector: 'app-upload-annonces',
  templateUrl: './upload-Annonces.component.html',
  styleUrls: ['./upload-Annonces.component.scss']
})
export class UploadAnnoncesComponent {
  private apiUrl = env.apiUrl;
  private apiPhotos = this.apiUrl + "uploads/images/vehicules/";
  title = 'dropzone';
  files: File[] = [];
  photos!:any[];
  @Output() photosEventEmitter:EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() loadingPhotoComplete:EventEmitter<Boolean> = new EventEmitter<Boolean>();
  limitPhotos = 5;

  constructor(private http: HttpClient ,private userServ:UserService) { }

  photosComplete(){
    this.loadingPhotoComplete.emit(true);
  }
  onSelect(event: { addedFiles: any; }):any {
    if(this.files.length <= this.limitPhotos){
      this.files.push(...event.addedFiles);
    }else{
      this.photosComplete();
    }


    const formData = new FormData();
    this.photos = [];
    for (let i = 0; i < this.files.length; i++) {
      formData.append("image", this.files[i], this.files[i].name);
      const headers = {'Authorization': this.userServ.getToken()};
      this.http.post(this.apiUrl + 'photos', formData, {headers}).subscribe({
        next: (res: any) => this.photos.push(this.apiPhotos + res),
        error: (error: { toString: () => any; }) => alert(console.error(error.toString())),
        complete: () => {
          this.photosComplete();
        }
      });
    }
    this.selectPhotos(this.photos);
  }
  public selectPhotos(picture: any[]): void {
    this.photosEventEmitter.emit(picture);
  }
  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
