import { FileService } from '../shared/services/fileService';
import { Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserService} from "../shared/services/user.service";
import {environment as env} from "../../environments/environment";
import {error} from "@angular/compiler/src/util";



@Component({
  selector: 'app-upload-annonces',
  templateUrl: './upload-Annonces.component.html',
  styleUrls: ['./upload-Annonces.component.scss']
})
export class UploadAnnoncesComponent {
  private apiUrl = env.apiUrl;
  title = 'dropzone';
  files: File[] = [];
  photos:any = [];
  messageError:string ="";

  constructor(private http: HttpClient ,private userServ:UserService) { }

  onSelect(event: { addedFiles: any; }):any {
if(this.files.length<6){
  alert("Vous avez atteint le nombre maximum de 5 photos!");
}else{
  this.files.push(...event.addedFiles);
      const formData = new FormData();
      for (var i = 0; i < this.files.length; i++) {
        formData.append("image", this.files[i],this.files[i].name);
        const headers = {'Authorization':  this.userServ.getToken()};
        this.http.post(this.apiUrl + 'photos', formData,{headers})
          .subscribe((res: any) => {
            this.photos.push(res)
            console.log(this.photos)
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


  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
