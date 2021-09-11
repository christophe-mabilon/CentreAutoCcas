import { FileService } from '../shared/services/fileService';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
// @ts-ignore
import * as events from "events";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
  public filesHolder$: Observable<
    { file: File; progress$: Observable<number> }[]
    > = this.fileService.filesHolder$.asObservable();
  @ViewChild('fileinput', { static: true }) inputRef!: ElementRef;
  over!: boolean;

  constructor(private fileService: FileService) {}

  openFile() {
    this.inputRef.nativeElement.click();
  }

  addFiles($event: Event) {
    // @ts-ignore
    const files = $event.target.files;
    this.fileService.addFiles(files);
  }

  removeFile(index: number) {
    this.fileService.removeFile(index);
  }

  dropFile($event: DragEvent) {
    if ($event.dataTransfer) {
      const files = $event.dataTransfer.files;
      this.fileService.addFiles(files);
    }
  }
}
