import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { StateService } from 'src/app/services/state.service';

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

  sizes = [80,60,40,20]; 

  active = {
    size: 40,
    type: 0
  }

  @Input() index: number = 0;

  @ViewChild('myCanvas') private myCanvas: ElementRef = {} as ElementRef
  @ViewChild('myCanvas2') private myCanvas2: ElementRef = {} as ElementRef
  @ViewChild('orig') private orig: ElementRef = {} as ElementRef
  @ViewChild('indicatorLeft') private indicatorLeft: ElementRef = {} as ElementRef
  @ViewChild('indicatorRight') private indicatorRight: ElementRef = {} as ElementRef
  @ViewChild('inputRight') private inputRight: ElementRef = {} as ElementRef
  @ViewChild('inputLeft') private inputLeft: ElementRef = {} as ElementRef
  mask = new Image();
  context!: CanvasRenderingContext2D;
  context2!: CanvasRenderingContext2D;
  contextOrig!: CanvasRenderingContext2D;
  contextIndicatorLeft!: CanvasRenderingContext2D;
  contextIndicatorRight!: CanvasRenderingContext2D;
  isBlack: boolean = false

  constructor(public imageService: ImageService, public stateService: StateService) { }

  ngAfterViewInit(): void {

    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.context2 = this.myCanvas2.nativeElement.getContext('2d');
    this.contextIndicatorLeft = this.indicatorLeft.nativeElement.getContext('2d');
    this.contextIndicatorRight = this.indicatorRight.nativeElement.getContext('2d');
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

      this.inputLeft.nativeElement.addEventListener("mousemove", (evt: any) => {
        this.drawIndicator(evt, this.inputLeft);
        if (this.stateService.mouseClick) {
          this.getMousePos(evt, this.inputLeft);
        }
      }, false);
      this.inputRight.nativeElement.addEventListener("mousemove", (evt: any) => {
        this.drawIndicator(evt, this.inputRight);
        if (this.stateService.mouseClick) {
          this.getMousePos(evt, this.inputRight);
        }
      }, false);

      this.draw();
    }
  }

  getMousePos(evt: any, inputCanvas: ElementRef) {
    const rect = inputCanvas.nativeElement.getBoundingClientRect();

    if (this.active.type == 0) {
      this.context.fillStyle = "white";
      this.context2.fillStyle = "white";
      this.context.clearRect(evt.clientX - rect.left - this.active.size/2, evt.clientY - rect.top - this.active.size/2, this.active.size, this.active.size)
      this.context2.fillRect(evt.clientX - rect.left - this.active.size/2, evt.clientY - rect.top - this.active.size/2, this.active.size, this.active.size)

    } else {
      this.context.fillStyle = "black";
      this.context2.fillStyle = "black";
      this.context.fillRect(evt.clientX - rect.left - this.active.size/2, evt.clientY - rect.top - this.active.size/2, this.active.size, this.active.size)
      this.context2.fillRect(evt.clientX - rect.left - this.active.size/2, evt.clientY - rect.top - this.active.size/2, this.active.size, this.active.size)
    }

  }

  drawIndicator(evt: any, inputCanvas: ElementRef) {

    const rect = inputCanvas.nativeElement.getBoundingClientRect();

    this.contextIndicatorLeft.fillStyle = "red";
    this.contextIndicatorLeft.clearRect(0, 0, inputCanvas.nativeElement.width, inputCanvas.nativeElement.height);
    this.contextIndicatorLeft.fillRect(evt.clientX - rect.left - this.active.size/2, evt.clientY - rect.top - this.active.size/2, this.active.size, this.active.size)

    this.contextIndicatorRight.fillStyle = "red";
    this.contextIndicatorRight.clearRect(0, 0, inputCanvas.nativeElement.width, inputCanvas.nativeElement.height);
    this.contextIndicatorRight.fillRect(evt.clientX - rect.left - this.active.size/2, evt.clientY - rect.top - this.active.size/2, this.active.size, this.active.size)

  }

  private draw() {

    let imgData = this.context.getImageData(0, 0, 500, 500);
    let pixels = imgData.data;

    for (var i = 0; i < pixels.length; i += 4) {

      const black = 255;

      if (pixels[i] == 255) {
        pixels[i] = 0;
        pixels[i + 1] = 0;
        pixels[i + 2] = 0;
        pixels[i + 3] = 0;
      } else {
      }
    }
    this.context.putImageData(imgData, 0, 0);
  }

  public setActive(size:number, type:number): void {
    this.active = {size: size, type: type}
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
