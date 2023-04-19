import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  images = new BehaviorSubject<(string | ArrayBuffer | null)[]>([]);

  constructor() { }
}
