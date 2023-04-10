import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-crop',
  templateUrl: './crop.component.html',
  styleUrls: ['./crop.component.scss']
})
export class CropComponent {
  @ViewChild('myCanvas') private myCanvas: ElementRef = {} as ElementRef
  @ViewChild('myCanvas2') private myCanvas2: ElementRef = {} as ElementRef
  image = new Image();
  context!: CanvasRenderingContext2D;
  context2!: CanvasRenderingContext2D;
  mouseDown:boolean = false;
  color = 'black' 
  isBottom:boolean = false;
  topY:number = 0;
  bottomY:number= 0;

  constructor() { }

  ngAfterViewInit(): void {

    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.context2 = this.myCanvas2.nativeElement.getContext('2d');

    this.image.src = "./assets/img/stiched.png";
    this.image.width = 500;
    this.image.height = 500;
    this.image.crossOrigin = "Anonymous";
    this.image.onload = () => {
      console.log("image has loaded!");
      this.context.drawImage(this.image, 0, 0, 500,500);
      this.context2.drawImage(this.image, 0, 0, 500,500);
      this.myCanvas2.nativeElement.addEventListener("mousemove",  (evt: any) => {
        if(this.mouseDown){
          this.getMousePos(evt);
        }
      }, false);
    }

    this.bottomY = this.image.height;
  }

  getMousePos(evt: any) {
    this.context2.clearRect(0,0,this.myCanvas2.nativeElement.width, this.myCanvas2.nativeElement.height);

    if(this.isBottom){
      this.bottomY = evt.clientY;
    } else {
      this.topY = evt.clientY;
    }

    this.context2.fillStyle="green";
    this.context2.fillRect(0, this.topY, this.image.width,1);
    this.context2.fillStyle="orange";
    this.context2.fillRect(0, this.bottomY, this.image.width,1);

  }

  toggleTopBottom():void{
    this.isBottom = !this.isBottom;
  }

  getTopBottom():string{
    if(this.isBottom){
      return "Bottom";
    }
    return "Tops";
  }
}
