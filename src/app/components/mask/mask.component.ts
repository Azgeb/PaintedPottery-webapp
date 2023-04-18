import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.scss']
})
export class MaskComponent implements AfterViewInit {
  @ViewChild('myCanvas') private myCanvas: ElementRef = {} as ElementRef
  @ViewChild('myCanvas2') private myCanvas2: ElementRef = {} as ElementRef
  @ViewChild('orig') private orig: ElementRef = {} as ElementRef
  image = new Image();
  origImage = new Image();
  context!: CanvasRenderingContext2D;
  context2!: CanvasRenderingContext2D;
  contextOrig!: CanvasRenderingContext2D;
  mouseDown:boolean = false;
  isBlack:boolean = false

  constructor() { }

  ngAfterViewInit(): void {

    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.context2 = this.myCanvas2.nativeElement.getContext('2d');
    this.contextOrig = this.orig.nativeElement.getContext('2d');
    this.origImage.src = "./assets/img/pottery.jpg";
    this.origImage.width = 500;
    this.origImage.height = 500;
    this.origImage.crossOrigin = "Anonymous";
    this.origImage.onload = () => {
      this.contextOrig.drawImage(this.origImage, 0, 0, 500,500);
    }

    this.image.src = "./assets/img/mask.png";
    this.image.width = 500;
    this.image.height = 500;
    this.image.crossOrigin = "Anonymous";
    this.image.onload = () => {
      console.log("image has loaded!");
      this.context.drawImage(this.image, 0, 0, 500,500);
      this.context2.drawImage(this.image, 0, 0, 500,500);
     
      this.myCanvas.nativeElement.addEventListener("mousemove",  (evt: any) => {
        if(this.mouseDown){
          this.getMousePos(evt);
        }
      }, false);
      this.draw();
    }
  }

  getMousePos(evt: any) {
    var rect = this.myCanvas.nativeElement.getBoundingClientRect();
    if(this.isBlack){
      this.context.fillStyle="black";
      this.context2.fillStyle="black";
      this.context.fillRect(evt.clientX - rect.left -15, evt.clientY - rect.top-15, 30,30)
      this.context2.fillRect(evt.clientX - rect.left-15, evt.clientY - rect.top-15, 30,30)
    } else {
      this.context.fillStyle="white";
      this.context2.fillStyle="white";
      this.context.clearRect(evt.clientX - rect.left -15, evt.clientY - rect.top-15, 30,30)
      this.context2.fillRect(evt.clientX - rect.left-15, evt.clientY - rect.top-15, 30,30)
    }

  }

  private draw() {
    
    let imgData: ImageData = this.context.createImageData(1, 1);
    imgData.data[0] = 255;
    imgData.data[1] = 0;
    imgData.data[2] = 0;
    imgData.data[3] = 0;

    console.log(this.context.getImageData(100, 100, 1, 1))
    for (let i = 0; i < this.myCanvas.nativeElement.height ; i++) {
      for (let j = 0; j < this.myCanvas.nativeElement.width; j++) {
        if(this.context.getImageData(i, j,1,1).data[0] == 255){
          this.context.putImageData(imgData, i, j);
        }
      }

    }
  }

  public toggleIsBlackClick(): void{
    this.isBlack = !this.isBlack;
  }

}
