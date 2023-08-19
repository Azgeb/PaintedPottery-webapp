import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ExampleRequestDTO } from 'src/app/objects/ExampleRequestDTO';
import { ExampleResponseDTO } from 'src/app/objects/ExampleResponseDTO';
import { ImageService } from 'src/app/services/image.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {

  img: any;
  imgData: string | ArrayBuffer | null = null;
  operationNumber = "0";

  constructor(private restService: RestService, private imageService: ImageService, private sanitizer: DomSanitizer) { }

  ngOnInit() {

    //console.log(this.setting.snippet)

  }

  onUpload(event: any) {
    for (let index = 0; index < event.target.files.length; index++) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imgData = event.target!.result;
      };
      reader.readAsDataURL(event.target.files[index]);
    }
  }

  getImage() {
    const exampleDTO: ExampleRequestDTO = new ExampleRequestDTO(<ArrayBuffer>this.imgData, ["--operation=" +this.operationNumber])
    this.restService.getExampleImg(exampleDTO)
      .subscribe((data: any) => {
        const exampleRequestDTO: ExampleResponseDTO = JSON.parse(data);
        if (exampleRequestDTO) {
          let objectURL = 'data:image/jpeg;base64,' + exampleRequestDTO.imgData;
          this.img = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        }
      });
  }

}
