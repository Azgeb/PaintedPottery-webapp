import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  public static MAX_IMAGE_HEIGHT: number = 640;
  public static MAX_IMAGE_WIDTH: number = 480;

  constructor() { }
}
