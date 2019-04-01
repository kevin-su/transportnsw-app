import { BrowserModule } from '@angular/platform-browser';
import { Component, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BusReportModule } from './modules/BusReport';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // AppRoutingModule,
    CommonModule,
    BusReportModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
