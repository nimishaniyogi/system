import { Component, OnInit } from '@angular/core';
import { FormPoster } from '../service/form-post.service';
import { User } from '../user';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  selectedFileProp = null;

  constructor(private formpost: FormPoster) { }
  
  userModel = new User('','');
  
  ngOnInit() {
  }

  onFileSelected(event) {
    this.selectedFileProp = <File>event.target.files[0];
    console.log(event);
    console.log(`name:`,this.selectedFileProp.name)
  }
  submit(form: NgForm) {
    this.userModel['filename'] = this.selectedFileProp.name;
    console.log(`some:`,this.selectedFileProp);
    this.formpost.postForm(this.selectedFileProp, this.userModel)
   confirm(` Successfully Saved The Form`);
   if(confirm){
   window.location.reload();
   setTimeout(window.location.reload, 5000);
   console.log("suceess")
   }
  }
}
