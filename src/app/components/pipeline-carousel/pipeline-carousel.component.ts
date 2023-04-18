import { Component } from '@angular/core';

@Component({
  selector: 'app-pipeline-carousel',
  templateUrl: './pipeline-carousel.component.html',
  styleUrls: ['./pipeline-carousel.component.scss']
})
export class PipelineCarouselComponent {
  componentIndex: number = 0;

  public changeIndex(add:number):void{
    this.componentIndex = this.componentIndex + add;
    if(this.componentIndex < 0) this.componentIndex = 0;
    if(this.componentIndex > 1) this.componentIndex = 1;
  }
}
