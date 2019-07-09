import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AverageLoanComponent } from "./loans/average-loan.component";
import { ApiAdapterService } from "./services/api-adapter.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AverageLoanComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ApiAdapterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
