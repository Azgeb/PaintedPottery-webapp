export class ExampleResponseDTO {
    imgData: ArrayBuffer = new ArrayBuffer(0);

    public constructor(imgData: ArrayBuffer) {
      this.imgData = imgData;
    }
  }