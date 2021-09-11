import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpEventType
} from '@angular/common/http';
import {environment as env} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiUrl = env.apiUrl;
  // @ts-ignore
  public filesHolder$: BehaviorSubject<
    {
      file: File;
      progress$: Observable<number>;
    }[]
    > = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  public addFiles(files: Iterable<unknown> | ArrayLike<unknown>) {

    this.filesHolder$.next([
      ...this.filesHolder$.value,
      ...Array.from(files).map((f: any) => {
        const formData = new FormData();
        formData.append('f', f);
        console.log(formData)
        const request = new HttpRequest('POST', this.apiUrl + 'photos/', formData, {
          reportProgress: true
        });

        return {
          file: f,
          progress$: this.http.request(request).pipe(
            map((event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.Sent: {
                  return 0;
                }
                case HttpEventType.UploadProgress: {
                  // @ts-ignore
                  return Math.round((event.loaded / event.total) * 100);
                }
                case HttpEventType.Response: {
                  return 100;
                }
                default: {
                  return 0;
                }
              }
            })
          )
        };console.log(this.filesHolder$.value)
      })
    ]);
  }

  public removeFile(index: number) {
    const files = this.filesHolder$.value.slice();
    files.splice(index, 1);
    this.filesHolder$.next(files);
  }
}
