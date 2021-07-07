import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AuthorComponent } from './author/author.component';

const routes: Routes = [
  { 
    path: 'customers', 
    component: CustomerListComponent 
  },
  { 
    path: 'author', 
    component: AuthorComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }