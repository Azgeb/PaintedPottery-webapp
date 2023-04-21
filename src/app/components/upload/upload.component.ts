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
    this.imageService.images.next([]);
    for (let index = 0; index < event.target.files.length; index++) {
      const reader = new FileReader(); 
      reader.onload = (event) => {
        this.imageService.addImage(event.target!.result)
      };
      reader.readAsDataURL(event.target.files[index]);
      
    }

   
  }
}
