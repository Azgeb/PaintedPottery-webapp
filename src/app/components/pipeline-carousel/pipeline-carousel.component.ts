import { Component } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-pipeline-carousel',
  templateUrl: './pipeline-carousel.component.html',
  styleUrls: ['./pipeline-carousel.component.scss']
})
export class PipelineCarouselComponent {
  componentIndex: number = 0;
  MAX_COMPONENT_INDEX: number = 2;

  constructor(public imageService: ImageService){
    
  }

  public changeIndex(add:number):void{

    if(this.componentIndex + add === 1 && this.imageService.images.value.length == 0){
      alert('Please select at least one Image.');
      return;
    }

    if(this.componentIndex === 1 && add == -1){
      if(!confirm('By going back, you lose all progress.\n\nDo you want to proceed?')){
        return;
      }
      
    }

    this.componentIndex = this.componentIndex + add;
    if(this.componentIndex < 0) this.componentIndex = 0;
    if(this.componentIndex > this.MAX_COMPONENT_INDEX) this.componentIndex = 1;
  }
}
