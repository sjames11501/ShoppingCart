import { NgModule } from '@angular/core';
import { MenuComponent } from './_components/menu/menu.component';
import { AboutComponent } from './_components/about/about.component';
import {ViewCartComponent} from './_components/viewcart/viewcart.component';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: ViewCartComponent },
  { path: '', component: MenuComponent },
  { path: 'about', component: AboutComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
