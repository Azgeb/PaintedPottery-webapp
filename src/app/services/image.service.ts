import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  //images = new BehaviorSubject<(string | ArrayBuffer | null)[]>(["./assets/img/mask.png", "./assets/img/pottery.jpg","./assets/img/mask.png", "./assets/img/pottery.jpg"]);
  images = new BehaviorSubject<(string | ArrayBuffer | null)[]>([]);

  constructor() { }

  public addImage(image: (string | ArrayBuffer | null)):void{
    this.images.value.push(image);
  }
}
