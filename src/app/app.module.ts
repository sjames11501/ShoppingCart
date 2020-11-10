import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { NavbarComponent } from './_components/navbar/navbar.component';
import { MenuComponent } from './_components/menu/menu.component';
import { MenuitemComponent } from './_components/menuitem/menuitem.component';
import { AboutComponent } from './_components/about/about.component';
import { ViewCartComponent } from './_components/viewcart/viewcart.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    MenuitemComponent,
    AboutComponent,
    ViewCartComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ CookieService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
