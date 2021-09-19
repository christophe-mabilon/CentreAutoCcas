import {Component, OnInit} from '@angular/core';
import {environment as env} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-upload-garage',
  templateUrl: './upload-garage.component.html',
  styleUrls: ['./upload-garage.component.scss']
})
export class UploadGarageComponent implements OnInit {

  private apiUrl = env.apiUrl;
  title = 'dropzone';
  files: File[] = [];
  messageError: string = "";

  constructor(private http: HttpClient, private userServ: UserService) {
  }

  onSelect(event: { addedFiles: any; }): any {
    this.files.push(...event.addedFiles);
    const formData = new FormData();
    formData.append("image", this.files[0],this.files[0].name);
      const headers = {'Authorization': this.userServ.getToken()};
      this.http.post(this.apiUrl + 'photos', formData, {headers})
        .subscribe((res: any) => {
          console.log(res)
          alert("la photo a bien eté envoyée!");
        })

  }

  onRemove(event: File) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  ngOnInit(): void {
  }

}
