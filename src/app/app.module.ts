import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { MessageComponent } from './message/message.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthorComponent } from './author/author.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    CustomerListComponent,
    MessageComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
