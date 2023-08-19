import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExampleRequestDTO } from 'src/app/objects/ExampleRequestDTO';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }


  public getExampleImg(dto:ExampleRequestDTO): Observable<any>{
   
    const url = 'http://localhost:3000/img';
    const headers = { 'Content-Type': 'text/plain'}
    return this.httpClient.post(url, dto, {headers, responseType: 'text'});
  }
}
