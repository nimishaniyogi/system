import { Injectable } from '@angular/core';
import { Http } from '@angular/http';



@Injectable()
export class FormPoster {
    path = 'http://localhost:3000';
    constructor(private http: Http) {}

    postForm(selectedFileProp,details) {

      console.log(`details: ${JSON.stringify(details)}, selectefdil: ${JSON.stringify(selectedFileProp)}`)
        
        const formData = new FormData();
        formData.append('image', selectedFileProp, selectedFileProp.name);
        console.log(`upload form name: ${selectedFileProp.name}`);
  
        this.http.post(this.path + '/upload/' + selectedFileProp.name, formData).subscribe(res => {
           console.log(res);
        });
        var user = details;
        var form = selectedFileProp;
        this.http.post(`http://localhost:3000/create`, user).subscribe(res => { console.log(`created res:${res}`)});
      }
}