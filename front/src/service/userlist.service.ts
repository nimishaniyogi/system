import { Injectable } from '@angular/core';
import { Http, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class UserlistService {
  path = 'http://localhost:3000';
  constructor(private http: Http) { }

  // get all users service
  getUserList() {
    return this.http.get(`${this.path}/user`).map(response => response.json());
  }

  downloadFile(fileName) {

    return this.http.get(`${this.path}/download/${fileName}`,{responseType: ResponseContentType.Blob})
   
  }

}
