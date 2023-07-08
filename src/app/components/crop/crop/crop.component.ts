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
      this.grayscale()
      this.context2.drawImage(new Image(), 0, 0, 500,500);
      this.myCanvas2.nativeElement.addEventListener("mousemove",  (evt: any) => {
        if(this.mouseDown){
          this.getMousePos(evt);
        }
      }, false);
    }

    this.bottomY = this.image.height-1;
    this.topY = 1;
  }

  getMousePos(evt: any) {
    var rect = this.myCanvas2.nativeElement.getBoundingClientRect();
  
    const epsilon = 10;
    const ypos = evt.clientY - rect.top

    if(ypos < this.topY + epsilon && ypos > this.topY - epsilon){
      this.topY = evt.clientY - rect.top;
    } else  if(ypos < this.bottomY + epsilon && ypos > this.bottomY - epsilon){
      this.bottomY = evt.clientY - rect.top;
    } 

  
    this.drawLines();

  }


  drawLines(){
    this.context2.clearRect(0,0,this.myCanvas2.nativeElement.width, this.myCanvas2.nativeElement.height);

    this.context2.fillStyle="green";
    this.context2.fillRect(0, this.topY, this.image.width,1);
    this.context2.fillStyle="orange";
    this.context2.fillRect(0, this.bottomY, this.image.width,1);
    
    this.context2.font = ".8rem Sans-serif";
    this.context2.strokeStyle = 'white';
    this.context2.lineWidth = 3
    this.context2.strokeText("Top", this.image.width/2, this.topY)
    this.context2.strokeText("Bottom", this.image.width/2,  this.bottomY)
    this.context2.fillStyle="black";
    this.context2.fillText("Top", this.image.width/2, this.topY)
    this.context2.fillText("Bottom", this.image.width/2,  this.bottomY)

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

  calculateBounding(){
    this.grayscale();
  }


  grayscale():void{
    this.context.drawImage(this.image, 0, 0, 500,500);
    let imgDataOrig = this.context.getImageData(0, 0, 500,500);
    let imgDataWork = this.context.getImageData(0, 0, 500,500);
    let pixels = imgDataWork.data;

    for (var i = 0; i < pixels.length; i += 4) {
  
      let lightness = pixels[i] * 0.2989 + pixels[i + 1] * 0.5870 + pixels[i + 2] * 0.1140;

      if(lightness > (255/2)){
        lightness = 255;
      } else {
        lightness = 0;
      }
  
      pixels[i] = lightness;
      pixels[i + 1] = lightness;
      pixels[i + 2] = lightness;
    }
    this.context.putImageData(imgDataWork, 0, 0);
    this.calculateTopAndBottom();
    this.context.putImageData(imgDataOrig, 0, 0);
  }

  calculateTopAndBottom():void{
    const thresshold = 20;

    for (let i = 0; i < this.context.canvas.height; i++) {
      let colorChangeCount = 0;
      let lastColor = 0;
      for (let j = 0; j < this.context.canvas.width; j++) {
        const color = this.context.getImageData(j, i, 1, 1).data[0];
        if (color != lastColor) {
          lastColor = color;
          colorChangeCount ++;
        }
      }
      if(colorChangeCount > thresshold){
        this.topY = i;
        break;
      }
    }

    for (let i = this.context.canvas.height; i >= 0; i--) {
      let colorChangeCount = 0;
      let lastColor = 0;
      for (let j = 0; j < this.context.canvas.width; j++) {
        const color = this.context.getImageData(j, i, 1, 1).data[0];
        if (color != lastColor) {
          lastColor = color;
          colorChangeCount ++;
        }
      }
      if(colorChangeCount > thresshold){
        this.bottomY = i;
        break;
      }
    }
    
    this.drawLines();
  }
}
