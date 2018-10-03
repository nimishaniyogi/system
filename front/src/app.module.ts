import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import { StaffComponent } from './staff/staff.component';
import { FormPoster } from './service/form-post.service';
import { HttpModule } from '@angular/http';
import { FormComponent } from './form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UserlistComponent } from './userlist/userlist.component';
import { UserlistService } from './service/userlist.service';

//import { HttpClient} from '@angular/common/http';



const routes = [{path : 'staff', component: StaffComponent},
                {path: '', component: ViewComponent},
                {path:'form', component: FormComponent},
                {path: 'user', component:UserlistComponent}
               
]


@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    StaffComponent,
    FormComponent,
    UserlistComponent
  ],
  imports: [
    BrowserModule,
    RouterModule, RouterModule.forRoot(routes), HttpModule,FormsModule, ReactiveFormsModule,
    NgbModule

    
  ],
  providers: [FormPoster, UserlistService],
  bootstrap: [AppComponent]
})



export class AppModule { }
