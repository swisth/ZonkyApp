import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { AverageLoanComponent } from "./loans/average-loan.component";
import { ApiAdapterService } from "./services/api-adapter.service";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    AverageLoanComponent,    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiAdapterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
