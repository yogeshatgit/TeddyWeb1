import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private _http:HttpClient) { }

  public uploadFile(file:any,category:any){
    return this._http.post(`http://localhost:8080/teddy-web/${category}`, file);
  }
}