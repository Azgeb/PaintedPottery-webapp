import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.scss']
})
export class MaskComponent implements AfterViewInit {
  @ViewChild('myCanvas') private myCanvas: ElementRef = {} as ElementRef
  @ViewChild('myCanvas2') private myCanvas2: ElementRef = {} as ElementRef
  image = new Image();
  context!: CanvasRenderingContext2D;
  context2!: CanvasRenderingContext2D;
  mouseDown:boolean = false;
  color = 'black' 

  constructor() { }

  ngAfterViewInit(): void {

    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.context2 = this.myCanvas2.nativeElement.getContext('2d');

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

  //Get Mouse Position
  getMousePos(evt: any) {
    var rect = this.myCanvas.nativeElement.getBoundingClientRect();
    this.context.fillStyle="red";
    //this.context.fillRect(evt.clientX - rect.left -25, evt.clientY - rect.top -25,50,50);

     /*
    this.context.beginPath();
    this.context.arc(evt.clientX - rect.left, evt.clientY - rect.top, 25, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.lineWidth = 5;
    this.context.strokeStyle =  this.color;
    this.context.stroke();
    */

    this.context.clearRect(evt.clientX - rect.left -15, evt.clientY - rect.top-15, 30,30)
    this.context2.clearRect(evt.clientX - rect.left-15, evt.clientY - rect.top-15, 30,30)
    /*
    this.context2.beginPath();
    this.context2.arc(evt.clientX - rect.left, evt.clientY - rect.top, 25, 0, 2 * Math.PI, false);
    this.context2.fillStyle = this.color;
    this.context2.globalAlpha = 0;
    this.context2.fill();
    this.context2.lineWidth = 5;
    this.context2.strokeStyle =  this.color;
    this.context2.stroke();
    */

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
        //this.context.putImageData(imgData, i, j)
        if(this.context.getImageData(i, j,1,1).data[0] == 255){
          this.context.putImageData(imgData, i, j);
          this.context2.putImageData(imgData, i, j);
        }
      }

    }
  }

  public onBlackClick(): void{
    this.color = 'black';
  }
  public onWhiteClick(): void{
    this.color = 'rgba(255,255,255,.5)';
  }

}
