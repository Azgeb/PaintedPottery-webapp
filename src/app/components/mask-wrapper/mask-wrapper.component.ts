import { Component } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-mask-wrapper',
  templateUrl: './mask-wrapper.component.html',
  styleUrls: ['./mask-wrapper.component.scss']
})
export class MaskWrapperComponent {

  images: HTMLImageElement[] = [];
  imageIndex: number = 0;

  constructor(public imageService: ImageService) {
    this.loadImages();
  }

  loadImages(): void {

    this.imageService.images.value.forEach(image => {
      let hlpImage: HTMLImageElement = new Image();
      hlpImage.src = String(image);
      hlpImage.crossOrigin = "Anonymous";

      this.images.push(hlpImage);
    }

    )

  }

  public addIndex(add: number): void {
    this.imageIndex = this.imageIndex + add;
    if (this.imageIndex >= this.images.length) this.imageIndex = this.images.length - 1;
    if (this.imageIndex < 0) this.imageIndex = 0;
  }


}
