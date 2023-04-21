import { Component } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-mask-wrapper',
  templateUrl: './mask-wrapper.component.html',
  styleUrls: ['./mask-wrapper.component.scss']
})
export class MaskWrapperComponent {

  images: HTMLImageElement[] = [];

  constructor(public imageService: ImageService){
    this.loadImages();
  }

  loadImages():void{
    
    this.imageService.images.value.forEach( image => {
      let hlpImage: HTMLImageElement = new Image();
      hlpImage.src = String(image);
      hlpImage.width = 500;
      hlpImage.height = 500;
      hlpImage.crossOrigin = "Anonymous";

      this.images.push(hlpImage);
    }

    )
   
  }

}
