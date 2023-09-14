import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {


  @ViewChild('myimage') private image: HTMLImageElement = {} as HTMLImageElement
  @ViewChild('myCanvas') private myCanvas: ElementRef = {} as ElementRef
  selectedFile: any;
  img: any;
  fileNames: String[] = [];

  constructor(public imageService: ImageService, private sanitizer: DomSanitizer) { }

  onChange(event: any) {
    this.imageService.images.next([]);
    for (let index = 0; index < event.target.files.length; index++) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        this.img = this.sanitizer.bypassSecurityTrustUrl(event.target!.result as string);
        this.imageService.addImage(await this.resizeImage(event.target!.result));
      };
      reader.readAsDataURL(event.target.files[index]);
      this.fileNames.push(event.target.files[index].name);
    }
  }

  public resizeImage(base64Str: any): Promise<string> {
    return new Promise((resolve) => {
      var canvas = document.createElement("canvas");
      canvas.width = ConfigurationService.MAX_IMAGE_WIDTH;
      canvas.height = ConfigurationService.MAX_IMAGE_HEIGHT;
      var ctx_ = canvas.getContext("2d");

      let img = new Image()
      img.src = base64Str
      img.onload = () => {
        const MAX_WIDTH = ConfigurationService.MAX_IMAGE_WIDTH;
        const MAX_HEIGHT = ConfigurationService.MAX_IMAGE_HEIGHT;
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height
            height = MAX_HEIGHT
          }
        }
        this.myCanvas.nativeElement.width = width
        this.myCanvas.nativeElement.height = height
        let ctx = this.myCanvas.nativeElement.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        let imgResize = new Image()
        imgResize.src = this.myCanvas.nativeElement.toDataURL()
        imgResize.onload = () => {

          (ctx_ as CanvasRenderingContext2D).fillStyle = "black";
          (ctx_ as CanvasRenderingContext2D).fillRect(0, 0, ConfigurationService.MAX_IMAGE_WIDTH, ConfigurationService.MAX_IMAGE_HEIGHT);
          (ctx_ as CanvasRenderingContext2D).drawImage(imgResize, (ConfigurationService.MAX_IMAGE_WIDTH - imgResize.width) / 2, (ConfigurationService.MAX_IMAGE_HEIGHT - imgResize.height) / 2, imgResize.width, imgResize.height);
          resolve(canvas.toDataURL())
        }

      }
    })
  }
}

