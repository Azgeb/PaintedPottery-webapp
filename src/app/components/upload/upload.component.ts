import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent{

  selectedFile:any; 

  constructor(public imageService: ImageService){}
  // On file Select
  onChange(event: any) {
    const reader = new FileReader(); 
    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => {
      let images: (string | ArrayBuffer | null)[] = [];
      images.push(event.target!.result);
      this.imageService.images.next(images);
    };
  }

  // OnClick of button Upload
  onUpload() {
  }
}
