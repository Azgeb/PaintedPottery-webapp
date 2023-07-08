import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  mouseClick = false;

  constructor() {

    window.addEventListener('mousedown', (evt: any) => {
      if (evt.buttons == 1) {
        this.mouseClick = true;
      }
    }, false);

    window.addEventListener('mouseup', (evt: any) => {
      this.mouseClick = false;
    }, false);

  }

}
