export class ExampleRequestDTO {
    imgData: ArrayBuffer = new ArrayBuffer(0);
    args: string[] = [];

    public constructor(imgData: ArrayBuffer, args : string[]) {
      this.imgData = imgData;
      this.args = args;
    }
  }