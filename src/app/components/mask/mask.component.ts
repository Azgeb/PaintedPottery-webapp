import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.scss']
})
export class MaskComponent implements AfterViewInit {

  image_: HTMLImageElement = new Image();

  @Input() set image(value: HTMLImageElement) {
    this.image_ = value;

  }

  @Input() index:number = 0;

  @ViewChild('myCanvas') private myCanvas: ElementRef = {} as ElementRef
  @ViewChild('myCanvas2') private myCanvas2: ElementRef = {} as ElementRef
  @ViewChild('orig') private orig: ElementRef = {} as ElementRef
  mask = new Image();
  context!: CanvasRenderingContext2D;
  context2!: CanvasRenderingContext2D;
  contextOrig!: CanvasRenderingContext2D;
  mouseDown: boolean = false;
  isBlack: boolean = false

  constructor(public imageService: ImageService) { }

  ngAfterViewInit(): void {

    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.context2 = this.myCanvas2.nativeElement.getContext('2d');
    this.contextOrig = this.orig.nativeElement.getContext('2d');

    this.imageChange();

    this.mask.src = "./assets/img/" + String(this.index) + "_mask.png";
    this.mask.width = 500;
    this.mask.height = 500;
    this.mask.crossOrigin = "Anonymous";
    this.mask.onload = () => {
      console.log("mask has loaded!");
      this.context.drawImage(this.mask, 0, 0, 500, 500);
      this.context2.drawImage(this.mask, 0, 0, 500, 500);

      this.myCanvas.nativeElement.addEventListener("mousemove", (evt: any) => {
        if (this.mouseDown) {
          this.getMousePos(evt, true);
        }
      }, false);
      this.myCanvas2.nativeElement.addEventListener("mousemove", (evt: any) => {
        if (this.mouseDown) {
          this.getMousePos(evt, false);
        }
      }, false);
      this.draw();
    }
  }

  getMousePos(evt: any, isOverlay: boolean) {
    let rect = this.myCanvas2.nativeElement.getBoundingClientRect();
    if (isOverlay) rect = this.myCanvas.nativeElement.getBoundingClientRect();

    if (this.isBlack) {
      this.context.fillStyle = "black";
      this.context2.fillStyle = "black";
      this.context.fillRect(evt.clientX - rect.left - 15, evt.clientY - rect.top - 15, 30, 30)
      this.context2.fillRect(evt.clientX - rect.left - 15, evt.clientY - rect.top - 15, 30, 30)
    } else {
      this.context.fillStyle = "white";
      this.context2.fillStyle = "white";
      this.context.clearRect(evt.clientX - rect.left - 15, evt.clientY - rect.top - 15, 30, 30)
      this.context2.fillRect(evt.clientX - rect.left - 15, evt.clientY - rect.top - 15, 30, 30)
    }

  }

  private draw() {

    let imgData = this.context.getImageData(0, 0, 500,500);
    let pixels = imgData.data;

    for (var i = 0; i < pixels.length; i += 4) {
  
      const black = 255;
      
      if (pixels[i] == 255 ) {
        pixels[i] = 0;
        pixels[i + 1] = 0;
        pixels[i + 2] = 0;
        pixels[i + 3] = 0;
      } else {
      }
    }
    this.context.putImageData(imgData, 0, 0);
  }

  public toggleIsBlackClick(): void {
    this.isBlack = !this.isBlack;
  }

  imageChange() {
    if (this.image_) {
      this.image_.onload = () => {
        this.contextOrig.drawImage(this.image_, 0, 0, 500, 500);
      }
      this.contextOrig.drawImage(this.image_, 0, 0, 500, 500);
    }
  }

}
