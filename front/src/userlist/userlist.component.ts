import { Component, OnInit } from '@angular/core';
import { UserlistService } from '../service/userlist.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
 
})
export class UserlistComponent implements OnInit {
  userListData: any = [];
  res = [];

  constructor(private userlistservice:UserlistService) {}

  ngOnInit(): void {
      this.getUserDetilList();
  }

  getUserDetilList(){
      this.userlistservice.getUserList().subscribe( usersl => {
          console.log(usersl);
          this.res = usersl;
          if(usersl){
              this.userListData = this.res;
          }
      })
      
  }

  downloadFile(fileName:string ) {
    this.userlistservice.downloadFile(fileName).subscribe((file)=>{
        console.log('here we are', file, file['_body']);
        
        var url= window.URL.createObjectURL(file['_body']);
        window.open(url);
    });
  }
}

