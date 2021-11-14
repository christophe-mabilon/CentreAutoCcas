import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment as env} from "../../../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../../../shared/services/user.service";


@Component({
  selector: 'app-upload-edit-annonce-user',
  templateUrl: './upload-edit-annonce-user.component.html',
  styleUrls: ['./upload-edit-annonce-user.component.scss']
})
export class UploadEditAnnonceUserComponent{
  @Input() importPhotos:any;
  private apiUrl = env.apiUrl.slice(0,22);
  @Output() photosEventEmitter:EventEmitter<any[]> = new EventEmitter<any[]>();

  private apiPhotos:any = this.apiUrl + "uploads/images/garages/";
  photos:any = [];
  title = 'dropzone';
  files: File[] = [];
  messageError: string = "";
  @Output() loadingPhotoComplete:EventEmitter<Boolean> = new EventEmitter<Boolean>();
  limitPhotos = 5;
  constructor(private http: HttpClient, private userServ: UserService) {
  }
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
      this.http.post(this.apiUrl + 'api/photos', formData, {headers}).subscribe({
        next: (res: any) => this.photos.push(this.apiPhotos + res),
        error: (error: { toString: () => any; }) => alert(console.error(error.toString())),
        complete: () => {
          this.photosComplete();

        }
      });
    }
    this.selectPhotos(this.photos);
  }
  public selectPhotos(pictures: any[]): void {
    this.photosEventEmitter.emit(pictures);
  }
  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
