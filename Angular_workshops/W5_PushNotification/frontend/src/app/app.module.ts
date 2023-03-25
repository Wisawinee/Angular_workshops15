import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { StockCreateComponent } from './stock/stock-create/stock-create.component';
import { StockHomeComponent } from './stock/stock-home/stock-home.component';
import { ShopComponent } from './shop/shop.component';
import { httpInterceptorProviders } from './interceptors';
import { ProgressComponent } from './progress/progress.component';
import { StockEditComponent } from './stock/stock-edit/stock-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    StockHomeComponent,
    StockCreateComponent,
    ProgressComponent,
    ShopComponent,
    StockEditComponent,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
  ],
})
export class AppModule {}
