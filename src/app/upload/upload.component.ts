import { FileService } from '../shared/services/fileService';
import { Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../shared/services/user.service";


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  title = 'dropzone';

  files: File[] = [];

  constructor(private http: HttpClient ,private userServ:UserService) { }

  onSelect(event: { addedFiles: any; }) {
    console.log(event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (var i = 0; i < this.files.length; i++) {
      formData.append("image", this.files[i],this.files[i].name);
      const headers = {'Authorization':  this.userServ.getToken()};
      this.http.post('http://localhost:8000/api/photos', formData,{headers})
        .subscribe((res: any) => {
          console.log(res);
        })
    }
    if( i == 0 ) {
      alert("echec de l'envoi de photos");
    }else if( i === 1 ){
        alert("la photo a bien eté envoyée!");
      }else if( i > 1 ){
      alert("les " + i + " photos ont bien étés envoyé !");
    }

  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
